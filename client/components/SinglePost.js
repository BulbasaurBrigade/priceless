import React from "react";
import { connect } from "react-redux";
import { setSinglePost } from "../store/singlePost";
import { Link } from "react-router-dom";
import UnselectedPostView from "./UnselectedPostView";
import SelectedPostView from "./SelectedPostView";

class SinglePost extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    this.props.getSinglePost(id);
  }

  render() {
    const { post, selectedPost, userId } = this.props;

    return (
      <div
        onClick={() => this.handleClick(post.id)}
        className={post.id === selectedPost.id ? "selected" : ""}
      >
        {post.id !== selectedPost.id ? (
          <UnselectedPostView post={post} />
        ) : (
          <SelectedPostView post={post} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedPost: state.singlePost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSinglePost: (id) => dispatch(setSinglePost(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
