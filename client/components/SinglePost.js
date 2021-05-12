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
      <div target={post.id} onClick={() => this.handleClick(post.id)}>
        <div>
          {images.map((image) => (
            <img src={image.imageUrl} key={image.id} />
          ))}
        </div>
        <h1>{post.title}</h1>
        <h3>location</h3>
        <h3>{post.status}</h3>
        {post.id === this.props.singlePost.id && (
          <div>
            <p>Description: {post.description}</p>
            <p>Pick Up Details:</p>
            <button>Request</button>
          </div>
        )}
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
