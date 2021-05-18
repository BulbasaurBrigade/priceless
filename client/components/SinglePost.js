import React from "react";
import { connect } from "react-redux";
import { setSinglePost, addRequester } from "../store/singlePost";

class SinglePost extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  handleClick(id) {
    this.props.getSinglePost(id);
  }

  handleRequest(event) {
    event.stopPropagation();
    const {
      userId,
      post: { id },
    } = this.props;
    this.props.addNewRequester(id, userId);
  }

  render() {
    const post = this.props.post;
    const images = post.postImages || [];

    return (
      <div
        id="single-post"
        onClick={() => this.handleClick(post.id)}
        className={post.id === this.props.singlePost.id ? "selected" : ""}
      >
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
              <button className="button" onClick={this.handleRequest}>
                Request
              </button>
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
    userId: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSinglePost: (id) => dispatch(setSinglePost(id)),
    addNewRequester: (postId, userId) => dispatch(addRequester(postId, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
