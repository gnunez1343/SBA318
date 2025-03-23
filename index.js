require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')

const users = require("./routes/user")
const posts = require("./routes/post")
const comments = require("./SBA-318/routes/comments")

const app = express()
const PORT = 3000

function checkAuth(req, res, next) {
    const token = req.headers.authorization;
    if (!token || token !== process.env.AUTH_TOKEN) {
        return res.status(403).json({ error: "Access denied: Invalid/missing token."})
    }
}

app.use("/protected", checkAuth)

app.set("view engine", "ejs")

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}))

app.use((req, res, next) => {
    const time = new Date()
    console.log(`request made at ${time.toLocaleTimeString()}`);
    console.log(`request type: ${req.method} sent to: ${req.url}`);
    next()
})

app.use("/users", users)
app.use("/posts", posts)
app.use("/comments", comments)  

// const users = require("./data/users")
// const posts = require("./data/posts")

// console.log(posts);
// console.log(users);

app.get('/', (req, res) => {
    res.send("Base home page")
})

app.get('/posts/view', (req, res) => {
    res.render("index", { posts })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// Catch and return errors as JSON to prevent crash
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Sorry, there was an error."})
})