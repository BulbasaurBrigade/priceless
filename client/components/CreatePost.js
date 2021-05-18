import React from "react";
import { connect } from "react-redux";
import { createPost } from "../store/posts";
import PostForm from "./PostForm";

const CreatePost = (props) => {
  return (
    <div className="form-container">
      <h2>please fill out the form to create a new post</h2>
      <PostForm submit={props.addPost} userId={props.userId} type="create" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    addPost: (post, userId) => dispatch(createPost(post, userId, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
