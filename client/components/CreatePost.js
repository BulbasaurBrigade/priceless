import React from "react";
import { connect } from "react-redux";
import { createPost } from "../store/posts";
import PostForm from "./PostForm";

const CreatePost = (props) => {
  return (
    <div>
      <PostForm submit={props.addPost} userId={props.userId} />
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
