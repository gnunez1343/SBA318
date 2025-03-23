import express from 'express';
import users from '../data/users.js';

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        res.json(users);
    })
    .post((req, res) => {
        if (req.body.name && req.body.username && req.body.email) {
            const newUser = {
                id: users.length + 1,
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
            };
            users.push(newUser);
            res.json(newUser);
        } else {
            res.status(400).json({ error: "Insufficient Data" });
        }
    });

router
    .route('/:userID')
    .get((req, res) => {
        const user = users.find(user => user.id == req.params.userID);
        if (user) {
            res.json(user);
        } else {
            res.status(404).send("User not found");
        }
    })
    .patch((req, res) => {
        const userIndex = users.findIndex(user => user.id == req.params.userID);
        if (userIndex !== -1) {
            for (const key in req.body) {
                users[userIndex][key] = req.body[key];
            }
            res.json(users[userIndex]);
        } else {
            res.status(404).send("User not found");
        }
    })
    .delete((req, res) => {
        const userIndex = users.findIndex(user => user.id == req.params.userID);
        if (userIndex !== -1) {
            const deletedUser = users.splice(userIndex, 1);
            res.json(deletedUser);
        } else {
            res.status(404).send("User not found");
        }
    });

export default router;
