const express = require('express');
const app = express();

// Middleware for parsing JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files directory
app.use(express.static('public'));

let posts = [];

// API endpoint to get all posts
app.get('/api/posts', (req, res) => {
    res.json(posts); // Respond with the posts array as JSON
});

// API endpoint to create a new post
app.post('/api/posts', (req, res) => {
    const { name, title, content } = req.body;
    const post = {
        name,
        title,
        content,
        createdAt: new Date()
    };
    posts.push(post);
    res.status(201).json(post); // Respond with the created post
});

// API endpoint to get a single post by ID
app.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = posts[id];
    if (post) {
        res.json(post); // Respond with the found post
    } else {
        res.status(404).json({ error: "Post not found" }); // Handle not found
    }
});

// API endpoint to update a post by ID
app.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const { name, title, content } = req.body;
    if (posts[id]) {
        posts[id] = {
            name,
            title,
            content,
            createdAt: posts[id].createdAt // Preserve original creation date
        };
        res.json(posts[id]); // Respond with the updated post
    } else {
        res.status(404).json({ error: "Post not found" }); // Handle not found
    }
});

// API endpoint to delete a post by ID
app.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    if (posts[id]) {
        const deletedPost = posts.splice(id, 1); // Remove the post from the array
        res.json(deletedPost); // Respond with the deleted post
    } else {
        res.status(404).json({ error: "Post not found" }); // Handle not found
    }
});

// Run the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});