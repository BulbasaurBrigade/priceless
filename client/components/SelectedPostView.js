import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addRequester } from "../store/singlePost";

class SelectedPostView extends React.Component {
  constructor() {
    super();
    this.handleRequest = this.handleRequest.bind(this);
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
    const { post, userId } = this.props;
    const images = post.postImages || [];
    const userLotteryTickets = this.props.userLotteryTickets || [];
    const ticketsArray = userLotteryTickets.map((ticket) => ticket.id);

    return (
      <div id="single-post">
        <div id="post-image">
          {images.map((image) => (
            <div key={image.id}>
              <a href={`#popup${image.id}`}>
                <img src={image.imageUrl} />
              </a>

              <div id={`popup${image.id}`} className="overlay">
                <div className="popup">
                  <img src={image.imageUrl} />
                  <a className="close" href="#">
                    &times;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div id="post-details">
          <h1>{post.title}</h1>
          {post.location && (
            <p>
              <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
              {post.location}
            </p>
          )}
          <p>
            <b>Status: </b>
            {post.status}
          </p>
          {post.description && (
            <p>
              <b>Description:</b>
              <br />
              {post.description}
            </p>
          )}
          {post.pickupDetails && (
            <p>
              <b>Pick Up Details: </b>
              <br />
              {post.pickupDetails}
            </p>
          )}
          {/* if user doesn't own the post, show the request button AND they haven't requested it*/}
          {post.posterId !== userId && !ticketsArray.includes(post.id) && (
            <button className="button" onClick={this.handleRequest}>
              Request
            </button>
          )}
          {/*if user owns the post, display a note that says so*/}
          {post.posterId === userId && (
            <h3>
              <b>This is your post!</b>
              <br />
              <button className="button">
                <Link to={`/mypost/${post.id}`}>edit details</Link>
              </button>
            </h3>
          )}
          {/*if user has entered lottery, display a note that says so*/}
          {ticketsArray.includes(post.id) && (
            <h3>
              <b>You've requested this post!</b>
            </h3>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.id,
    userLotteryTickets: state.userLotteryTickets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewRequester: (postId, userId) => dispatch(addRequester(postId, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedPostView);
