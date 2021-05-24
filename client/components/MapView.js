/* eslint-disable react/prefer-stateless-function */
import React from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  useMapEvents,
} from "react-leaflet";
import { connect } from "react-redux";
import MarkerComponent from "./MarkerComponent";
import { setLocalPosts } from "../store/posts";

function MapView(props) {
  const posts = props.posts || [];
  const { getPosts } = props;
  const defaultLocation = [40.6872, -73.943];
  const userLocation = props.userLocation;

  // gets the map's current bounds and fetch posts within those bounds
  function fetchPosts(map) {
    const currBounds = map.getBounds();
    getPosts(
      currBounds.getNorth(),
      currBounds.getEast(),
      currBounds.getSouth(),
      currBounds.getWest()
    );
  }

  // a functional component with access to the map instance
  function PostsGetter() {
    const map = useMapEvents({
      dragend() {
        fetchPosts(map);
      },
      zoom() {
        fetchPosts(map);
      },
    });
    return null;
  }

  return (
    <div id="map-view">
      <MapContainer
        className="map"
        scrollWheelZoom={true}
        touchZoom={true}
        zoom={15}
        center={props.userLocation ? userLocation : defaultLocation}
        whenCreated={(map) => {
          fetchPosts(map);
        }}
      >
        <PostsGetter />
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>
                '
          url="https://api.mapbox.com/styles/v1/acornsquash/ckoyo5692280j18lpg289wesz/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWNvcm5zcXVhc2giLCJhIjoiY2tva3JybnZqMDNrdTJvb2ZrZzUzY3RyMSJ9.GRYj5oZ7vgJhQ11zbRaTgg"
        />
        <FeatureGroup>
          {posts.length &&
            posts.map((post) => {
              return <MarkerComponent post={post} key={post.id} />;
            })}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPosts: (North, East, South, West) =>
    dispatch(setLocalPosts(North, East, South, West)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MapView);
