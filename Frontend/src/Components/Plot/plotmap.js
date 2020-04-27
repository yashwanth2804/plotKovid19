import React, { useContext } from "react";

import { appContext } from "../../Contexts/AppContext";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polyline,
  CircleMarker,
} from "react-leaflet";
const Plotmap = () => {
  const { appState, appDispatch } = useContext(appContext);
  const renderPositions = (positions) => {
    return (
      <>
        <Polyline color="#220bb9" positions={positions} />
        <Polyline color="red" positions={positions} />
        {positions.map((position, index) => (
          <CircleMarker
            key={index}
            center={position}
            fill={true}
            color="#220bb9"
            radius={3}
          >
            <Popup>
              <b>Start Time:</b> {position.starttime} <br />
              <b>End Time:</b> {position.endtime} <br />
            </Popup>
          </CircleMarker>
        ))}
      </>
    );
  };

  return (
    <div>
      {" "}
      <Map center={appState.selectedVictim.center_position} zoom={15}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {renderPositions(appState.selectedVictim.cords)}
      </Map>
    </div>
  );
};

export default Plotmap;

// export default class plotmap extends Component {
//   state = {
//     lat: 51.505,
//     lng: -0.09,
//     zoom: 13
//   };
//   render() {
//     const position = [this.state.lat, this.state.lng];
//     return (
// <div>

//   <Map center={position} zoom={4}>
//     <TileLayer
//       attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//     />
//     <Marker position={position}>
//       <Popup>
//         A pretty CSS3 popup. <br /> Easily customizable.
//       </Popup>
//     </Marker>
//   </Map>
// </div>
//     );
//   }
// }
