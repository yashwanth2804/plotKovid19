import React from "react";
import { DriftMarker } from "leaflet-drift-marker";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polyline,
} from "react-leaflet";
const DriftMarkerComponent = (props) => {
  return (
    <div>
      {props.simulate ? (
        ""
      ) : (
        <DriftMarker
          position={props.latlng}
          //duration={appState.intersect.map.user_duration}
          duration={props.duration}
          keepAtCenter={true}
        >
          <Popup>
            Start Time :{props.st}
            <br></br>
            End Time :{props.et}
          </Popup>
          <Tooltip>You</Tooltip>
        </DriftMarker>
      )}
    </div>
  );
};

export default DriftMarkerComponent;
