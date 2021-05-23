import React from "react";
import { connect } from "react-redux";
import SinglePost from "./SinglePost";

class ListView extends React.Component {
  render() {
    const { posts, postFilters } = this.props;

    return (
      <div id="list-view">
        {posts.length ? (
          posts.map((post) => <SinglePost key={post.id} post={post} />)
        ) : (
          <div id="no-posts">
            There are no posts in your immediate area. Zoom out or drag the map
            to a different neighborhood to see posts.
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
    postFilters: state.postFilters,
  };
};

export default connect(mapStateToProps)(ListView);
