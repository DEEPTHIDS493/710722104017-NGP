import React, { useEffect, useState } from "react";
import { fetchPosts, fetchComments } from "../api";

const TrendingPosts = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);

  useEffect(() => {
    const loadTrendingPosts = async () => {
      const posts = await fetchPosts();
      const comments = await fetchComments();

      const commentCount = {};
      comments.forEach(comment => {
        commentCount[comment.postId] = (commentCount[comment.postId] || 0) + 1;
      });

      const maxComments = Math.max(...Object.values(commentCount));

      const trending = posts.filter(post => commentCount[post.id] === maxComments);

      setTrendingPosts(trending);
    };

    loadTrendingPosts();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Trending Posts</h2>
      {trendingPosts.map(post => (
        <div key={post.id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrendingPosts;
