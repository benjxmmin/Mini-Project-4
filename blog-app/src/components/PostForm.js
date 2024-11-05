import React, { useState } from 'react';
import axios from 'axios';

const PostForm = ({ onNewPost }) => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = { name, title, content };

        try {
            // Make a POST request to create a new post
            const response = await axios.post('http://localhost:3000/api/posts', newPost);
            onNewPost(response.data); // Pass the created post back to the parent component
        } catch (error) {
            console.error('Error creating post:', error);
        }

        // Optionally, reset form fields
        setName('');
        setTitle('');
        setContent('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <label>Content:</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
            <button type="submit">Create Post</button>
        </form>
    );
};

export default PostForm;