import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { setPosts, deletePost } from "../../store/posts";
import { getUserPosts } from "../../store/userPosts";

class MyPosts extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    if (confirm("Are you sure you want to delete this post?")) {
      const postId = event.target.value;
      this.props.removePost(postId);
    }
  }

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
                value={post.id}
                onClick={this.handleClick}
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
