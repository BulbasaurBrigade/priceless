import React from 'react';
// import MapPopUp from "./MapPopUp";
import { Marker, Popup } from 'react-leaflet';
import { connect } from 'react-redux';
import { setSinglePost, _setSinglePost } from '../store/singlePost';
import L from 'leaflet';

const selectedIcon = new L.icon({
  //iconUrl: "https://i.postimg.cc/4N5hZ4Jd/noun-map-pointer-2317847.png",
  iconUrl: 'https://i.postimg.cc/hPk7xMJ3/placeholder-1.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const unselectedIcon = new L.icon({
  //iconUrl: "https://i.postimg.cc/ryBFQZr9/noun-map-pointer-3859353.png",
  iconUrl: 'https://i.postimg.cc/fyhRyqqx/placeholder-2.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const viewedIcon = new L.icon({
  iconUrl: 'https://i.postimg.cc/sxZggdJf/placeholder.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

class MarkerComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      marker: unselectedIcon,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate() {
    if (
      this.props.singlePost.id === this.props.post.id &&
      this.state.marker === unselectedIcon
    ) {
      this.setState({ marker: viewedIcon });
    }
  }

  handleClick(id) {
    const { singlePost, getSinglePost, resetSinglePost } = this.props;
    if (id === singlePost.id) {
      resetSinglePost();
    } else {
      getSinglePost(id);
    }
  }

  render() {
    const lat = this.props.post.latitude;
    const long = this.props.post.longitude;
    const post = this.props.post;

    return (
      <div onClick={() => this.handleClick(post.id)}>
        <Marker
          icon={
            this.props.singlePost.id === post.id
              ? selectedIcon
              : this.state.marker
          }
          position={[lat, long]}
          eventHandlers={{
            click: (e) => {
              this.handleClick(post.id, e);
            },
          }}
        />
        {/* <Popup>
          <p>{this.props.singlePost.title}</p>
        </Popup> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singlePost: state.singlePost,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSinglePost: (id) => dispatch(setSinglePost(id)),
    resetSinglePost: () => dispatch(_setSinglePost({})),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarkerComponent);
