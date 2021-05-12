import React from "react";
import { connect } from "react-redux";
import { setSinglePost } from "../store/singlePost";

class SinglePost extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.props.getSinglePost(id);
  }

  render() {
    const post = this.props.post;
    const images = post.postImages || [];

    return (
      <div id="single-post" onClick={() => this.handleClick(post.id)}>
        <div id="post-image">
          {images.map((image) => (
            <img src={image.imageUrl} key={image.id} />
          ))}
        </div>
        <div id="post-details">
          <h1>{post.title}</h1>
          <p>Location</p>
          <p>Status: {post.status}</p>
          {post.id === this.props.singlePost.id && (
            <div>
              <p>Description: {post.description}</p>
              <p>
                Pick Up Details: pick up on Monday or Wednesday between 10am and
                4:30pm
              </p>
              <button>Request</button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singlePost: state.singlePost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSinglePost: (id) => dispatch(setSinglePost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
