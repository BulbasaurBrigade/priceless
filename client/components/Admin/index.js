import React from 'react';
import AdminPostsView from './AdminPostsView';

export default function AdminContainer({ match }) {
  const { params } = match;
  console.log(params);

  if (params.view === 'posts') return <AdminPostsView />;

  return (
    <div>
      <h1>Hey there, admin</h1>
    </div>
  );
}
