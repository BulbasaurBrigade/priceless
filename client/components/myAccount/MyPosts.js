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
      <div id="my-posts">
        <h2>My Posts</h2>
        {userPosts.map((post) => (
          <div id="my-post" key={post.id}>
            <p>{post.title}</p>
            <div>
              <button className="my-post-button">
                <Link to={`/mypost/${post.id}`}>
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </Link>
              </button>
              <button
                className="my-post-button"
                onClick={() => this.props.removePost(post.id)}
              >
                X
              </button>
            </div>
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
