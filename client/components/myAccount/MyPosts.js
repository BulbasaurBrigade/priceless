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
    console.log("post", userPosts);
    return (
      <div id="my-posts">
        {userPosts.map((post) => (
          <div id="my-post" key={post.id}>
            <p>{post.title}</p>
            <div>
              <button>
                <Link to={`/mypost/${post.id}`}>
                  <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                </Link>
              </button>
              <button onClick={() => this.props.removePost(post.id)}>
                <i className="fa fa-trash" aria-hidden="true"></i>
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
