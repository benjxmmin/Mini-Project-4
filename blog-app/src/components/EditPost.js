import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
    const { id } = useParams(); // Get the post ID from the URL
    const navigate = useNavigate();
    const [post, setPost] = useState({ name: '', title: '', content: '' });

    // Fetch the post data when the component mounts
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`); // Fetch the post by ID
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        fetchPost();
    }, [id]);

    // Handle form submission for updating the post
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/posts/${id}`, post); // Update the post
            navigate('/'); // Redirect to the main page after saving
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({ ...prevPost, [name]: value })); // Update post state
    };

    return (
        <div>
            <h2>Edit Post</h2>
            <form onSubmit={handleSubmit}>
                <label>Name:</label>
                <input
                    type="text"
                    name="name"
                    value={post.name}
                    onChange={handleChange}
                    required
                />
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={post.title}
                    onChange={handleChange}
                    required
                />
                <label>Content:</label>
                <textarea
                    name="content"
                    value={post.content}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;