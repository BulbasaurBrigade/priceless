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
              Status: <span style={{ color: "red" }}>{post.status}</span>{" "}
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              {post.status === "open" ? (
                <div className="tooltip-content" id="tooltip-left">
                  <p>
                    This post is open, request it to be immediately connected!
                  </p>
                </div>
              ) : (
                <div className="tooltip-content" id="tooltip-left">
                  <p>
                    This post is in {post.status} mode, request it for a chance
                    to get connected with the poster.
                  </p>
                </div>
              )}
            </div>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default UnselectedPostView;
