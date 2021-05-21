import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MapNavbar from './MapNavbar';
import MapView from './MapView';
import ListView from './ListView';
import { setPosts } from '../store/posts';
import { getUserLotteryTickets } from '../store/userLotteryTickets';

class MainContainer extends React.Component {
  componentDidMount() {
    const { userId, fetchMyLotteryTickets } = this.props;
    if (userId !== undefined) fetchMyLotteryTickets(this.props.userId);
  }
  render() {
    let userLocation;
    if (this.props.userLat) {
      userLocation = [this.props.userLat, this.props.userLng];
    }
    return (
      <div>
        <MapNavbar />
        <div id="main-container-bottom">
          <MapView userLocation={userLocation} />
          <ListView />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userLat: state.auth.latitude,
    userLng: state.auth.longitude,
    userId: state.auth.id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => dispatch(setPosts()),
    fetchMyLotteryTickets: (userId) => dispatch(getUserLotteryTickets(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
