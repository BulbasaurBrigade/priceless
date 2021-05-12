import React from "react";
import MarkerComponent from "./MarkerComponent";
import { MapContainer, TileLayer } from 'react-leaflet'
import { connect } from 'react-redux'

class MapView extends React.Component {
  render() {
    
    const posts = this.props.posts || []

    return (
      <div id="map-view">
        <MapContainer className="map" scrollWheelZoom={true} touchZoom={true} zoom={13} center={[40.6872, -73.943]}>
            <TileLayer
                attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>
                '
                url='https://api.mapbox.com/styles/v1/acornsquash/ckokrm9jn06x318oapmx26p36/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWNvcm5zcXVhc2giLCJhIjoiY2tva3JybnZqMDNrdTJvb2ZrZzUzY3RyMSJ9.GRYj5oZ7vgJhQ11zbRaTgg'
                />
                {posts.length && posts.map((post) => {
                  return (
                  <MarkerComponent post={post} key={post.id}/>
                  )
                })}
        </MapContainer>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(MapView)