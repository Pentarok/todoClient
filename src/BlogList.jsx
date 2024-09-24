// src/components/BlogList.js
import React from 'react';
import './BlogList.css';
import BlogPost from './BlogPost';

const BlogList = () => {
  const posts = [
    { title: 'Post One', content: 'This is the first post content.' },
    { title: 'Post Two', content: 'This is the second post content.' },
    { title: 'Post Three', content: 'This is the third post content.' },
  ];

  return (
    <div className="blog-list">
      {posts.map((post, index) => (
        <BlogPost key={index} title={post.title} content={post.content} />
      ))}
    </div>
  );
}

export default BlogList;
