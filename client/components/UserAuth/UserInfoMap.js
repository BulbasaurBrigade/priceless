import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import ChangeView from "../ChangeView";

//The default location is the center of NYC.
const defaultLocation = [40.742, -73.9073];

const unselectedIcon = new L.icon({
  iconUrl: "https://i.postimg.cc/fyhRyqqx/placeholder-2.png",
  iconSize: [40, 40],
  iconAnchor: [1, 1],
});

export default class UserInfoMap extends React.Component {
  render() {
    const userlat = this.props.userlat;
    const userlng = this.props.userlng

    return (
      <div>
        {/* The map centers on the user's location - whether that be what they currently have in their profile or a new location they are previewing. */}
        <MapContainer
          className="preview-map"
          scrollWheelZoom={true}
          touchZoom={true}
          zoom={13}
          center={defaultLocation}
        >
          {userlat ? (
            <div>
              <ChangeView center={[userlat - 0.009, userlng + 0.008]} zoom={13} />
              <Marker icon={unselectedIcon} position={[userlat, userlng]} />
            </div>
          ) : (
            <div> Loading location .. </div>
          )}
          <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>
                '
            url="https://api.mapbox.com/styles/v1/acornsquash/ckoyo5692280j18lpg289wesz/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWNvcm5zcXVhc2giLCJhIjoiY2tva3JybnZqMDNrdTJvb2ZrZzUzY3RyMSJ9.GRYj5oZ7vgJhQ11zbRaTgg"
          />
        </MapContainer>
      </div>
    );
  }
}
