import React from "react";
import { connect } from "react-redux";
import { setPosts } from "../../store/posts";

class MyPosts extends React.Component {
  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const posts = this.props.posts;
    console.log(posts);
    return (
      <div>
        {posts.map((post) => (
          <div>
            <p>{post.title}</p>
            <button>edit</button>
            <button>delete</button>
          </div>
        ))}
      </div>
    );
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
