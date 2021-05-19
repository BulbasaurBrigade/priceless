import React from "react";
import { connect } from "react-redux";
import SinglePost from "./SinglePost";

class ListView extends React.Component {
  render() {
    const { posts, postFilters } = this.props;
    console.log("postFilters", postFilters.filter);

    return (
      <div id="list-view">
        {posts.length ? (
          posts.map((post) => <SinglePost key={post.id} post={post} />)
        ) : (
          <div id="no-posts">
            There are no posts in your immediate area. Scroll to a different
            area to see posts.
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
