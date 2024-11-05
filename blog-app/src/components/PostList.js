import React from 'react';

const PostList = ({ posts, onEditPost, onDeletePost }) => {
    return (
        <div>
            <h2>Blog Posts</h2>
            <ul>
                {posts.map((post, index) => (
                    <li key={index}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                        <p>by {post.name} on {new Date(post.createdAt).toDateString()}</p>
                        <button onClick={() => onEditPost(post, index)}>Edit</button> {/* Edit button */}
                        <button onClick={() => onDeletePost(index)}>Delete</button> {/* Delete button */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;