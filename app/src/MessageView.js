import { useEffect, useState } from 'react';
import axios from 'axios';
import * as constant from './const/ConstantDB';

const handleSubmit = (e) => {
    console.log(new Date().toISOString().slice(0, 19).replace('T', ' '));

    const msg = {
        sender_id: 1,
        receiver_id: 2,
        content: 'LOOOOOOOOL',
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };

    e.preventDefault();

    // do something with form values, and then
    axios
        .post(constant.URL_DB + 'add-message', {
            headers: {
                'Content-Type':
                    'application/x-www-form-urlencoded; charset=UTF-8',
            },
            msg, // + any other parameters you want to send in the POST request
        })
        .then((response) => {
            console.log('Message envoyé sur la DB' + response);
        })
        .catch((error) => {
            // do something when request was unsuccessful
        });
};

const MessageDisplay = (props) => (
    <div class="message">
        <div class="message__outer">
            <div class="message__avatar"></div>
            <div class="message__inner">
                <div class="message__bubble"></div>
                <div class="message__actions">
                    <p> {props.text}</p>
                </div>
                <div class="message__spacer"></div>
            </div>
            <div class="message__status"></div>
        </div>
    </div>
);

export const MessageView = (props) => {
    const [messages, setMessages] = useState([]);

    console.log('LOL');

    useEffect(() => {
        axios
            .get(constant.URL_DB + 'messageById', {
                params: {
                    senderId: 1,
                    receiverId: 2,
                },
            })
            .then((response) => {
                //console.log('Message envoyé sur la DB' + response);

                setMessages(response.data);
            })
            .catch((error) => {
                // do something when request was unsuccessful
            });
    }, []);

    return (
        <div className="MessageView">
            <div className="DestInfo">
                <img src={props.url_avatar} alt="Avatar" />
                <div className="nameDestInfo">{props.name}</div>
            </div>
            <div className="Chat">
                {messages.map((msg) => (
                    <MessageDisplay text={msg.content} />
                ))}
            </div>
            <div className="SendMessage">
                <form method="post" onSubmit={(event) => handleSubmit(event)}>
                    <input
                        class="write-message"
                        id="password"
                        placeholder="Ecrivez votre message ici..."
                    />
                    <button className="clickable" type="submit">
                        Envoyer
                    </button>
                </form>
            </div>
        </div>
    );
};
