const posts = require("../data/post");
const express = require('express');
const router = express.Router();

router
    .route('/')
    .get((req, res) => {
        const { userId } = req.query;
        const filteredPosts = userId ? posts.filter(post => post.userId == userId) : posts;
        res.json(filteredPosts);
})
    .post((req, res) => {
        if(req.body.userId && req.body.title && req.body.content){
            const post = {
                id: posts[posts.length -1].id + 1,
                userId: req.body.userId,
                title: req.body.title,
                content: req.body.content
            }
            posts.push(post)
            res.json(posts[posts.length -1])
        } else res.json({error: "Insufficient Data"})
    })


router
    .route('/:postsID')
    .get((req, res) => {
    const post = posts.find((post) => post.id == req.params.postsID)
    if (post) {res.json(post)}
    else{res.status(404).send("Post not found")}
})
    .patch((req, res)=> {
        const post = posts.find((post, i) => {
            if(post.id == req.params.postsID){
                for (const key in req.body){
                    posts[i][key] = req.body[key]
                }
                return true
            }
        })
        if(post) res.json(post)
        else {res.status(404).send("Post not found")}
    })
    .delete((req, res) => {
        const post = posts.find((post, i) => {
            if(post.id == req.params.postsID){
                posts.splice(i, 1)
                return true
            }
        })
        if (post) res.json(post)
        else {res.status(404).send("Post not found")}
    });

  router
  .route("/:postsID/comments")
  .get((req, res) => {
    const comments = require("../data/comments")
    res.json(comments.filters )
  })

module.exports = router