import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setPosts, deletePost } from "../../store/posts";
import { getUserPosts } from "../../store/userPosts";

class MyPosts extends React.Component {
  handleClick = () => {
    this.props.removePost();
  };

  componentDidMount() {
    const { userId } = this.props;
    this.props.fetchUserPosts(userId);
  }

  render() {
    const { userPosts } = this.props;
    return (
      <div>
        {userPosts.map((post) => (
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
    userPosts: state.userPosts,
    userId: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserPosts: (userId) => dispatch(getUserPosts(userId)),
    removePost: (postId) => dispatch(deletePost(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts);
