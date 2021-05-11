import React from "react";
import { connect } from "react-redux";
import SinglePost from "./SinglePost";

class ListView extends React.Component {
  render() {
    const posts = this.props.posts;
    return (
      <div>
        {posts.map((post) => (
          <SinglePost key={post.id} post={post} />
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

export default connect(mapStateToProps)(ListView);
