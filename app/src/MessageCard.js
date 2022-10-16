export const MessageCard = (props) => {
    return (
        <div
            className="MessageCard"
            onClick={() =>
                props.onClick({
                    msgCard: {
                        name: props.name,
                        url_avatar: props.avatar_url,
                    },
                })
            }
        >
            <img src={props.avatar_url} alt="Avatar" />
            <div className="info">
                <div className="name">{props.name}</div>
                <div className="company">{props.company}</div>
            </div>
        </div>
    );
};

export const UserCard = (props) => (
    <div className="OwnUserCard">
        <img src={props.avatar_url} alt="Avatar OwnUser" />
        <div className="info">
            <div className="name">{props.name}</div>
        </div>
    </div>
);
