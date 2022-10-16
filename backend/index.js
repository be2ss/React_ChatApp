const express = require('express');
const cors = require('cors');
const knex = require('knex');
require('dotenv').config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS implemented so that we don't get errors when trying to access the server from a different server location
app.use(cors());

// GET: Fetch all users from the database
app.get('/users', (req, res) => {
    db.select('*')
        .from('users')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// GET: Fetch movie by movieId from the database
app.get('/user/:userId', (req, res) => {
    const userId = req.params.userId;
    db.select('*')
        .from('users')
        .where('user_id', '=', userId)
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// GET: Fetch all avatarUser from the database
app.get('/avatar/:userId', (req, res) => {
    const userId = req.params.userId;
    db.select('*')
        .from('users_avatar')
        .where('id', '=', userId)
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// POST: Create users and add them to the database
app.post('/add-user', (req, res) => {
    const { name, surname, mail, password } = req.body;
    db('users')
        .insert({
            name: name,
            surname: surname,
            mail: mail,
            password: password,
        })
        .then(() => {
            console.log('User Added');
            return res.json({ msg: 'User Added' });
        })
        .catch((err) => {
            console.log(err);
        });
});

// DELETE: Delete movie by movieId from the database
app.delete('/delete-user', (req, res) => {
    const userId = req.body;
    const userIdToDelete = Number(userId.userId);
    console.log(userIdToDelete);
    db('users')
        .where('user_id', '=', userIdToDelete)
        .del()
        .then(() => {
            console.log('User Deleted');
            return res.json({ msg: 'User Deleted' });
        })
        .catch((err) => {
            console.log(err);
        });
});

// PUT: Update movie by movieId from the database
app.put('/update-user', (req, res) => {
    db('users')
        .where('user_id', '=', 1)
        .update({ name: 'Rodolphe' })
        .then(() => {
            console.log('User Updated');
            return res.json({ msg: 'User Updated' });
        })
        .catch((err) => {
            console.log(err);
        });
});

// POST: Create users and add them to the database
app.post('/add-user', (req, res) => {
    const { name, surname, mail, password } = req.body;
    db('users')
        .insert({
            name: name,
            surname: surname,
            mail: mail,
            password: password,
        })
        .then(() => {
            console.log('User Added');
            return res.json({ msg: 'User Added' });
        })
        .catch((err) => {
            console.log(err);
        });
});

// POST: Create messages and add them to the database
app.post('/add-message', (req, res) => {
    const { sender_id, receiver_id, content, timestamp } = req.body.msg;
    db('messages')
        .insert({
            sender_id: sender_id,
            receiver_id: receiver_id,
            content: content,
            timestamp: timestamp,
        })
        .then(() => {
            console.log('Msg Added');
            return res.json({ msg: 'User Added' });
        })
        .catch((err) => {
            console.log(err);
        });
});

// GET: Fetch message by senderId & receiverId from the database
app.get('/messageById', (req, res) => {
    console.log(req.query);
    const senderId = req.query.senderId;
    const receiverId = req.query.receiverId;

    console.log(senderId);

    db.select('*')
        .from('messages')
        .where(function () {
            this.orWhere('sender_id', '=', senderId)
                .orWhere('sender_id', '=', receiverId)
                .orWhere('receiver_id', '=', senderId)
                .orWhere('receiver_id', '=', receiverId);
        })
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`Server running on port ${port}, http://localhost:${port}`)
);
