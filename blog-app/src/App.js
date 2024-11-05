import React, { useEffect, useState } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';
import './styles.css';
import axios from 'axios';

const App = () => {
    const [posts, setPosts] = useState([]);

    // Fetch posts from the server
    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts'); // Ensure this is the correct path
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    useEffect(() => {
        fetchPosts(); // Fetch posts on initial render
    }, []);

    // Function to handle adding a new post
    const handleNewPost = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]); // Add new post to the existing posts
    };

    return (
        <div>
            <h1>My Blog</h1>
            <PostForm onNewPost={handleNewPost} /> {/* Pass the function as a prop */}
            <PostList posts={posts} /> {/* Pass the posts as a prop */}
        </div>
    );
};

export default App;