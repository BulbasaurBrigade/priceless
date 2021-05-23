import React from "react";

const UnselectedPostView = (props) => {
  const { post } = props;
  const images = post.postImages || [];
  return (
    <div id="single-post">
      <div id="post-image">
        <div>
          <img src={images[0].imageUrl} />
        </div>
      </div>
      <div id="post-details">
        <h1>{post.title}</h1>
        <div className="location-status">
          <h3>
            <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
            {post.location}
          </h3>

          <h4>
            <div className="tooltip-wrap">
              Status <i class="fa fa-info-circle" aria-hidden="true"></i>
              <div className="tooltip-content">explanation</div>
            </div>
            <span style={{ color: "red" }}>{post.status}</span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default UnselectedPostView;
