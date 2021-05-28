import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AdminPostsView from './AdminPostsView';

export default function AdminContainer({ match }) {
  const { params } = match;
  const displayName = useSelector((state) => state.auth.displayName);

  return (
    <div id="admin-container">
      <h1>Hey there, Admin {displayName}</h1>
      <div className="flex-row nav">
        <Link to="/admin/posts">View All Active Posts</Link>
        <Link to="/admin/users">View All Users</Link>
      </div>
      {params.view === 'posts' && <AdminPostsView />}
    </div>
  );
}
