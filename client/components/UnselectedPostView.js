import React from "react";

const UnselectedPostView = (props) => {
  const { post } = props;
  const images = post.postImages || [];
  return (
    <div id="single-post">
      <div id="post-image">
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.imageUrl} />
          </div>
        ))}
      </div>
      <div id="post-details">
        <h1>{post.title}</h1>
        {post.location && (
          <p>
            <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
            {post.location}
          </p>
        )}
        <p>
          <b>Status: </b>
          {post.status}
        </p>
      </div>
    </div>
  );
};

export default UnselectedPostView;
