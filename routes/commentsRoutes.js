import express from 'express';
import comments from '../data/comments.js';

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        res.json(comments);
    })
    .post((req, res) => {
        if (req.body.userId && req.body.postId && req.body.body) {
            const newComment = {
                id: Number(comments[comments.length - 1].id) + 1,
                userId: req.body.userId,
                postId: req.body.postId,
                body: req.body.body,
            };
            comments.push(newComment);
            res.json(newComment);
        } else {
            res.json({ error: "Insufficient Data" });
        }
    });

router
    .route('/:commentID')
    .get((req, res) => {
        const comment = comments.find(comment => comment.id === req.params.commentID);
        res.json(comment);
    })
    .patch((req, res) => {
        const commentIndex = comments.findIndex(comment => comment.id == req.params.commentID);
        if (commentIndex !== -1) {
            for (const key in req.body) {
                comments[commentIndex][key] = req.body[key];
            }
            res.json(comments[commentIndex]);
        } else {
            res.status(404).send("Comment not found");
        }
    })
    .delete((req, res) => {
        const commentIndex = comments.findIndex(comment => comment.id == req.params.commentID);
        if (commentIndex !== -1) {
            const deletedComment = comments.splice(commentIndex, 1);
            res.json(deletedComment);
        } else {
            res.status(404).send("Comment not found");
        }
    });

export default router;
