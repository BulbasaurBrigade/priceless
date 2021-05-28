import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost, setPosts } from '../../store/posts';

const fields = [
  'title',
  'description',
  'pickupDetails',
  'location',
  'category',
  'status',
  'type',
];

export default function AdminPostsView() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(setPosts());
  }, []);

  return (
    <div id="admin-table">
      <table>
        <thead>
          <tr>
            {fields.map((field) => (
              <th key={field}>{field}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              {fields.map((field) => (
                <td key={`${post.id}-${field}`}>{post[field]}</td>
              ))}
              <button
                type="button"
                className="button"
                onClick={() => {
                  dispatch(deletePost(post.id));
                }}
              >
                Delete
              </button>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/*
Structure of a Post:

{
  title,
  description,
  pickupDetails,
  location,
  latitude, //not included
  longitude, //not included
  category (enum),
  status (enum),
  type (enum)
}

*/
