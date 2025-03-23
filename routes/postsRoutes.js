import express from 'express';
import posts from '../data/posts.js';

const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        const { userId } = req.query;
        const filteredPosts = userId ? posts.filter(post => post.userId == userId) : posts;
        res.json(filteredPosts);
    })
    .post((req, res) => {
        if (req.body.userId && req.body.title && req.body.content) {
            const post = {
                id: posts.length + 1,
                userId: req.body.userId,
                title: req.body.title,
                content: req.body.content,
            };
            posts.push(post);
            res.json(post);
        } else {
            res.json({ error: "Insufficient Data" });
        }
    });

router
    .route('/:postsID')
    .get((req, res) => {
        const post = posts.find(post => post.id == req.params.postsID);
        if (post) {
            res.json(post);
        } else {
            res.status(404).send("Post not found");
        }
    })
    .patch((req, res) => {
        const postIndex = posts.findIndex(post => post.id == req.params.postsID);
        if (postIndex !== -1) {
            for (const key in req.body) {
                posts[postIndex][key] = req.body[key];
            }
            res.json(posts[postIndex]);
        } else {
            res.status(404).send("Post not found");
        }
    })
    .delete((req, res) => {
        const postIndex = posts.findIndex(post => post.id == req.params.postsID);
        if (postIndex !== -1) {
            const deletedPost = posts.splice(postIndex, 1);
            res.json(deletedPost);
        } else {
            res.status(404).send("Post not found");
        }
    });

export default router;
