import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addRequester } from "../store/singlePost";
import ImageSlideshow from "./ImageSlideshow";

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
          <a href={`#popup${post.id}`}>
            <img src={images[0].imageUrl} />
          </a>

          <div id={`popup${post.id}`} className="overlay">
            <div className="popup">
              <ImageSlideshow slides={images} />
              <a className="close" href="#">
                &times;
              </a>
            </div>
          </div>
        </div>
        <div id="post-details">
          {/*if user owns the post, display a note that says so*/}
          {post.posterId === userId && (
            <div>
              <h3>** This is your post **</h3>
              <Link to={`/mypost/${post.id}`}>
                <button className="submit">edit details</button>
              </Link>
            </div>
          )}
          <h1>{post.title}</h1>
          <div className="location-status">
            <h3>
              <i className="fa fa-map-marker" aria-hidden="true"></i>{" "}
              {post.location}
            </h3>

            <h4>
              <div className="tooltip-wrap">
                Status <i class="fa fa-info-circle" aria-hidden="true"></i>
                <div className="tooltip-content">explanation</div>
              </div>
              <span style={{ color: "red" }}>{post.status}</span>
            </h4>
          </div>

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
            <button className="submit" onClick={this.handleRequest}>
              Request
            </button>
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
