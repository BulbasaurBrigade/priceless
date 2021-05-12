import React from "react";
import { Popup } from "react-leaflet";

class MapPopUp extends React.Component {
  render() {
    const lat = this.props.post.latitude;
    const long = this.props.post.longitude;
    const { title } = this.props.post;
    return (
      <div>
        <Popup position={[lat, long]}>
          <p>{title}</p>
        </Popup>
      </div>
    );
  }
}

export default MapPopUp;
