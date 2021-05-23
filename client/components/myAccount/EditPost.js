import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setSinglePost } from "../../store/singlePost";
import { editPost } from "../../store/posts";
import PostForm from "../PostForm";

class EditPost extends React.Component {
  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.id);
  }

  render() {
    const { singlePost, updatePost, userId } = this.props;
    return (
      <div className="form-container">
        <h2>Edit your post below</h2>
        <PostForm
          post={singlePost}
          submit={updatePost}
          userId={userId}
          type="edit"
        />
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

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    getSinglePost: (postId) => dispatch(setSinglePost(postId)),
    updatePost: (post) => dispatch(editPost(post, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPost);
