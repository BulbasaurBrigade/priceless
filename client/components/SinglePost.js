import React from 'react';
import { connect } from 'react-redux';
import { setSinglePost, _setSinglePost } from '../store/singlePost';
import UnselectedPostView from './UnselectedPostView';
import SelectedPostView from './SelectedPostView';

class SinglePost extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id) {
    const { selectedPost, getSinglePost, resetSinglePost } = this.props;
    if (id === selectedPost.id) {
      resetSinglePost();
    } else {
      getSinglePost(id);
    }
  }

  render() {
    const { post, selectedPost, userId } = this.props;

    return (
      <div
        onClick={() => this.handleClick(post.id)}
        className={post.id === selectedPost.id ? 'selected' : ''}
      >
        {post.id !== selectedPost.id ? (
          <UnselectedPostView post={post} />
        ) : (
          <SelectedPostView post={post} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedPost: state.singlePost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSinglePost: (id) => dispatch(setSinglePost(id)),
    resetSinglePost: () => dispatch(_setSinglePost({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
