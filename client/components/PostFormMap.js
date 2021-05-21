import React from "react"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import ChangeView from './ChangeView'

const defaultLocation = [40.6679209,-73.9558908];
const unselectedIcon = new L.icon({
    iconUrl: "https://i.postimg.cc/fyhRyqqx/placeholder-2.png",
    iconSize: [40, 40],
    iconAnchor: [1, 1],
  });

  export default class PostFormMap extends React.Component {

    render(){
        console.log(this.props, "map props")
        const userLocation = this.props.userLocation
        return(
            <div>
                <MapContainer 
                className="signup-map"
                scrollWheelZoom={true}
                touchZoom={true}
                zoom={13}
                setView={true}
                center={defaultLocation}
                >
                    {userLocation ? (
                        <div>
                        <ChangeView center={userLocation} zoom={13} />
                        <Marker icon={unselectedIcon} position={userLocation}/>
                        </div>
                        ) : (
                          <div> Loading location .. </div> 
                    )}
                    <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>
                '
          url="https://api.mapbox.com/styles/v1/acornsquash/ckon3ntey3igm18mu353gbxs0/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWNvcm5zcXVhc2giLCJhIjoiY2tva3JybnZqMDNrdTJvb2ZrZzUzY3RyMSJ9.GRYj5oZ7vgJhQ11zbRaTgg"
        />
                </MapContainer>
          
          </div>
        )

    }
  }