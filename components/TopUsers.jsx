import React, { useEffect, useState } from "react";
import { fetchUsers, fetchPosts } from "../api";

const TopUsers = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const users = await fetchUsers();
      const posts = await fetchPosts();

      const userPostCount = {};
      posts.forEach(post => {
        userPostCount[post.userId] = (userPostCount[post.userId] || 0) + 1;
      });

      const sortedUsers = users
        .map(user => ({ ...user, postCount: userPostCount[user.id] || 0 }))
        .sort((a, b) => b.postCount - a.postCount)
        .slice(0, 5);

      setTopUsers(sortedUsers);
    };

    loadUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Top 5 Users</h2>
      <ul className="list-group">
        {topUsers.map(user => (
          <li key={user.id} className="list-group-item">
            {user.name} - {user.postCount} posts
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
