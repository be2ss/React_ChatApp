import { MessageCard, UserCard } from './MessageCard';
import axios from 'axios';
import * as constant from './const/ConstantDB';
import './msg.css';
import QueryUtils from './db/QueryUtils';
import React, { useCallback, useEffect, useState } from 'react';

const OWN_USER_ID = 1;

export const MessageMenu = (props) => {
    const [users, setUsers] = useState([]);
    const [ownUser, setOwnUser] = useState([]);
    const [loading, setLoading] = useState(true);

    const removeOwnUser = () => {
        setUsers((users) =>
            users.filter((users) => users.user_id !== OWN_USER_ID)
        );
    };

    useEffect(() => {
        if (loading) {
            QueryUtils.getAllUsers().then((allUsers) => {
                setUsers(allUsers);
            });

            QueryUtils.getUserFromId(OWN_USER_ID).then((ownUser) => {
                setOwnUser(ownUser[0]);
            });

            setLoading(false);
        }
    }, [loading]);

    useEffect(() => {
        if (users.filter((users) => users.user_id === OWN_USER_ID).length > 0) {
            removeOwnUser();
        }
    }, [users]);

    return (
        <div className="MessageMenu">
            <UserCard
                key={ownUser.user_id}
                name={ownUser.name + '  ' + ownUser.surname}
                avatar_url={ownUser.avatar_url}
            />
            <div className="MessageMenuCard">
                {users.length > 0 ? (
                    users.map((users) => (
                        <MessageCard
                            key={users.user_id}
                            name={users.name + '  ' + users.surname}
                            avatar_url={users.avatar_url}
                            onClick={props.onClick}
                        />
                    ))
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};
