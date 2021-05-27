import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../../store/posts';

const fields = [
  'title',
  'description',
  'pickUpDetails',
  'location',
  'category',
  'status',
  'type',
];

export default function AdminPostsView() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    const getPosts = async () => {
      await dispatch(setPosts());
    };

    getPosts();
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
