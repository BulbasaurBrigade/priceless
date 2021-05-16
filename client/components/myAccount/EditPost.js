import React from "react";
import { connect } from "react-redux";
import { setPosts } from "../../store/posts";

class MyPosts extends React.Component {
  render() {
    return <div>Hello</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(setPosts()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
