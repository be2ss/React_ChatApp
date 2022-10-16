import React, { useEffect, useState } from 'react';
import { MessageMenu } from './MessageMenu';
import { MessageView } from './MessageView';

export const MessageMainContainer = () => {
    const [cardSelected, setCardSelected] = useState({
        msgCard: {
            name: '',
            url_avatar: '',
        },
    });

    const onClickMsgCard = (value) => {
        setCardSelected((prevState) => ({
            ...prevState,
            msgCard: {
                name: value.msgCard.name,
                url_avatar: value.msgCard.url_avatar,
            },
        }));
    };

    const isVisible = cardSelected.name === undefined;

    return (
        <div className="MainContainer">
            <MessageMenu onClick={onClickMsgCard} />
            <div className="MessageViewContainer">
                {isVisible === true ? (
                    <MessageView
                        name={cardSelected.msgCard.name}
                        url_avatar={cardSelected.msgCard.url_avatar}
                    />
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    );
};
