import React from "react";
import { connect } from "react-redux";
import { setSinglePost, addRequester } from "../store/singlePost";

class SinglePost extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.handleRequest = this.handleRequest.bind(this);
  }

  handleClick(id) {
    this.props.getSinglePost(id);
  }

  handleRequest(event) {
    event.stopPropagation();
    const {
      userId,
      post: { id },
    } = this.props;
    this.props.addNewRequester(id, userId);
  }

  render() {
    const { post, selectedPost, userId } = this.props;
    const images = post.postImages || [];
    const userLotteryTickets = this.props.userLotteryTickets || [];
    //creates an array of the user's lottery tickets to make it easier to search
    const ticketsArray = userLotteryTickets.map((ticket) => ticket.id);
    console.log("ticketsArray", ticketsArray);

    return (
      <div
        id="single-post"
        onClick={() => this.handleClick(post.id)}
        className={post.id === selectedPost.id ? "selected" : ""}
      >
        <div id="post-image">
          {images.map((image) => (
            <img src={image.imageUrl} key={image.id} />
          ))}
        </div>
        <div id="post-details">
          <h1>{post.title}</h1>
          <p>Location</p>
          <p>Status: {post.status}</p>
          {/* if the post is selected, show more information */}
          {post.id === selectedPost.id && (
            <div>
              <p>Description: {post.description}</p>
              <p>
                Pick Up Details: pick up on Monday or Wednesday between 10am and
                4:30pm
              </p>
              {/* if user doesn't own the post, show the request button AND they haven't requested it*/}
              {selectedPost.posterId !== userId &&
                !ticketsArray.includes(selectedPost.id) && (
                  <button className="button" onClick={this.handleRequest}>
                    Request
                  </button>
                )}
              {/*if user owns the post, display a note that says so*/}
              {selectedPost.posterId === userId && (
                <p>
                  <b>This is your post!</b>
                </p>
              )}
              {/*if user has already entered lottery, display a note that says so*/}
              {ticketsArray.includes(selectedPost.id) && (
                <p>
                  <b>You've already entered this lottery!</b>
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    selectedPost: state.singlePost,
    userId: state.auth.id,
    userLotteryTickets: state.userLotteryTickets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSinglePost: (id) => dispatch(setSinglePost(id)),
    addNewRequester: (postId, userId) => dispatch(addRequester(postId, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);
