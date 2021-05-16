import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setPosts, deletePost } from "../../store/posts";

class MyPosts extends React.Component {
  // handleClick = () => {
  //   this.props.removePost(post.id);
  // };

  componentDidMount() {
    this.props.getPosts();
  }

  render() {
    const posts = this.props.posts;
    console.log(posts);
    return (
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <p>{post.title}</p>
            <button>
              <Link to={`/mypost/${post.id}`}>edit</Link>
            </button>
            <button onClick={() => this.props.removePost(post.id)}>
              delete
            </button>
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
    removePost: (post) => dispatch(deletePost(post)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
