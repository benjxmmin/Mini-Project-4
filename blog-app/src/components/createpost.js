import React from 'react';
import PostForm from './PostForm';

const CreatePost = ({ onPostCreated }) => {
  const handleCreatePost = async (newPost) => {
    try {
      await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      // Call the callback function to inform that a new post was created
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return <PostForm onSubmit={handleCreatePost} />;
};

export default CreatePost;