import React, { Component, useState, useContext } from "react";
import {
  Map,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polyline,
} from "react-leaflet";
import { DriftMarker } from "leaflet-drift-marker";
import { Row, Col, Button, Badge } from "antd";

import Time from "./Time";
import {
  BackwardFilled,
  ForwardFilled,
  UserAddOutlined,
} from "@ant-design/icons";

import { appContext } from "../../Contexts/AppContext";
import { Icon } from "leaflet";
import MapMarker from "../../SVG/MapMarker";
var moment = require("moment");

const Intersectmap = () => {
  // const initalState = {
  //   // user_latlng: { lat: 0, lng: 0 },
  //   // user_end_latlng: { lat: 0, lng: 0 },

  //   // victim_latlng: { lat: 0, lng: 0 },
  //   // victim_end_latlng: { lat: 0, lng: 0 },

  //   isSimulated: false,
  //   user_duration: 0,
  //   victim_duration: 0,
  //   speedFactor: 1,
  //   total_trip_start_time: "",
  //   total_trip_end_time: "",
  //   Timerange: [],

  //   usertime: {},
  //   victimtime: {},

  //   isTimerRunning: false,
  // };
  const { appState, appDispatch, renderIntersect } = useContext(appContext);
  //const [state, setState] = useState(initalState);
  const pointArrays = (f) => {
    return [f.lat, f.lng];
  };
  const simulate = () => {
    const intersectionlines = appState.intersect.map.intersectionlines;

    console.log("Intersec", intersectionlines);

    const {
      user_latlng: User_latlng,
      user_end_latlng: User_end_latlng,
      victim_latlng: Victim_latlng,
      victim_end_latlng: Victim_end_latlng,
    } = intersectionlines;

    console.log(JSON.stringify(intersectionlines));
    const intersectionLinesArr = Object.values(intersectionlines).map((f) => f);
    const Timerange = intersectionLinesArr
      .map((f) => moment(f.starttime))
      .sort((a, b) => a - b)
      //.map((f) => f.toISOString());
      .filter((f, i) => i == 0 || i == intersectionLinesArr.length - 1)
      .map((f) => f.toISOString());

    console.log(Timerange, intersectionLinesArr.length);

    const userDuration = Math.abs(
      moment(User_latlng.starttime).diff(
        moment(User_end_latlng.starttime),
        "ms"
      )
    );

    const victmDuration = Math.abs(
      moment(Victim_latlng.starttime).diff(
        moment(Victim_end_latlng.starttime),
        "ms"
      )
    );

    console.log(userDuration, victmDuration, appState.intersect.map);
    const usertime = {
      st: User_latlng.starttime,
      et: User_end_latlng.starttime,
    };

    const victimtime = {
      st: Victim_latlng.starttime,
      et: Victim_end_latlng.starttime,
    };

    const map = {
      usertime: usertime,
      victimtime: victimtime,
      Timerange: Timerange,
      isSimulated: true,
      // intersectionlines: {
      //   user_latlng: User_end_latlng,
      //   user_end_latlng: User_latlng,
      //   victim_latlng: Victim_end_latlng,
      //   victim_end_latlng: Victim_latlng,
      // },

      user_duration: userDuration / appState.intersect.map.speedFactor,
      victim_duration: victmDuration / appState.intersect.map.speedFactor,
      // speedFactor: appState.intersect.map.speedFactor,
    };

    console.log("AMP", map);
    appDispatch({ type: "SIMULATE", payload: { map: map } });
  };
  // const simulate = () => {
  //   const intersectionlines = appState.intersect.map.intersectionlines;

  //   console.log("Intersec", intersectionlines);

  //   const {
  //     user_latlng: User_latlng,
  //     user_end_latlng: User_end_latlng,
  //     victim_latlng: Victim_latlng,
  //     victim_end_latlng: Victim_end_latlng,
  //   } = intersectionlines;

  //   console.log(JSON.stringify(intersectionlines));
  //   const intersectionLinesArr = Object.values(intersectionlines).map((f) => f);
  //   const Timerange = intersectionLinesArr
  //     .map((f) => moment(f.starttime))
  //     .sort((a, b) => a - b)
  //     //.map((f) => f.toISOString());
  //     .filter((f, i) => i == 0 || i == intersectionLinesArr.length - 1)
  //     .map((f) => f.toISOString());

  //   console.log(Timerange, intersectionLinesArr.length);

  //   const userDuration = Math.abs(
  //     moment(User_latlng.starttime).diff(
  //       moment(User_end_latlng.starttime),
  //       "ms"
  //     )
  //   );

  //   const victmDuration = Math.abs(
  //     moment(Victim_latlng.starttime).diff(
  //       moment(Victim_end_latlng.starttime),
  //       "ms"
  //     )
  //   );

  //   console.log(userDuration, victmDuration, appState.intersect.map);
  //   const usertime = {
  //     st: User_latlng.starttime,
  //     et: User_end_latlng.starttime,
  //   };

  //   const victimtime = {
  //     st: Victim_latlng.starttime,
  //     et: Victim_end_latlng.starttime,
  //   };

  //   const map = {
  //     usertime: usertime,
  //     victimtime: victimtime,
  //     Timerange: Timerange,
  //     isSimulated: true,
  //     intersectionlines: {
  //       user_latlng: User_end_latlng,
  //       user_end_latlng: User_latlng,
  //       victim_latlng: Victim_end_latlng,
  //       victim_end_latlng: Victim_latlng,
  //     },

  //     user_duration: userDuration / appState.intersect.map.speedFactor,
  //     victim_duration: victmDuration / appState.intersect.map.speedFactor,
  //     // speedFactor: appState.intersect.map.speedFactor,
  //   };

  //   console.log("AMP", map);
  //   appDispatch({ type: "SIMULATE", payload: { map: map } });
  // };

  const reset = () => {
    const intersectionlines = appState.intersect.map.selectedCords;

    console.log("Intersec>>>>>>", intersectionlines);

    const {
      user_latlng,
      user_end_latlng,
      victim_latlng,
      victim_end_latlng,
    } = intersectionlines;
    console.log("Intersec", intersectionlines, "-->", user_latlng);

    const map = {
      usertime: {},
      victimtime: {},
      intersectionlines: {
        user_latlng: user_latlng,
        user_end_latlng: user_end_latlng,
        victim_latlng: victim_latlng,
        victim_end_latlng: victim_end_latlng,
      },
      user_duration: 1,
      victim_duration: 1,

      Timerange: [],
      isSimulated: false,
    };
    console.log("MAP", map);
    appDispatch({ type: "RESET_SIMULATE", payload: { map: map } });
  };

  const incSpeedFactor = () => {
    console.log("Inc speed factor");
    const val = appState.intersect.map.speedFactor * 2;
    console.log(val);
    if (val <= 32)
      appDispatch({
        type: "UPDATE_SPEED_FACTOR",
        payload: { speedFactor: val },
      });
  };
  const decSpeedFactor = () => {
    const val = appState.intersect.map.speedFactor / 2;
    if (val > 0)
      appDispatch({
        type: "UPDATE_SPEED_FACTOR",
        payload: { speedFactor: val },
      });
  };

  return (
    <div>
      <Row>
        <Col span={4}>
          {!appState.intersect.map.isSimulated ? (
            <Button
              style={{ fontWeight: "bold", fontSize: "14px", height: "44px" }}
              type="primary"
              onClick={() => simulate()}
            >
              Simulate
            </Button>
          ) : (
            <Button
              style={{ fontWeight: "bold", fontSize: "14px", height: "44px" }}
              type="danger"
              onClick={() => reset()}
            >
              Reset
            </Button>
          )}
        </Col>
        {/* <Col span={2}>
            <Clock isTimerRunning={state.isTimerRunning} />
          </Col> */}
        <Col style={{ padding: "4px" }} span={16}>
          {appState.intersect.map.Timerange.length > 0 && (
            <Time
            //Timerange_st={appState.intersect.map.Timerange[0]}
            //Timerange_ed={appState.intersect.map.Timerange[1]}
            //speedfactor={appState.intersect.map.speedFactor}
            //isSimulated={appState.intersect.map.isSimulated}
            />
          )}
        </Col>
        <Col span={4}>
          {!appState.intersect.map.isSimulated && (
            <Row>
              <Col span={24} offset={1}>
                <BackwardFilled
                  onClick={() => decSpeedFactor()}
                  style={{ fontSize: "24px", cursor: "pointer" }}
                />{" "}
                <span style={{ fontSize: "24px" }}>
                  x{appState.intersect.map.speedFactor}{" "}
                </span>
                <ForwardFilled
                  onClick={() => incSpeedFactor()}
                  style={{ fontSize: "24px", cursor: "pointer" }}
                />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <div style={{ height: "10px", display: "block" }}></div>
      <Map draggable={true} center={appState.intersect.center} zoom={16}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Polyline
          positions={[
            pointArrays(appState.intersect.map.intersectionlines.user_latlng),
            pointArrays(
              appState.intersect.map.intersectionlines.user_end_latlng
            ),
          ]}
          // onMouseOver={(e) => e.target.openPopup()}
          color={"green"}

          //onMouseOut={(e) => e.target.closePopup()}
        ></Polyline>
        <Polyline
          positions={[
            pointArrays(appState.intersect.map.intersectionlines.victim_latlng),
            pointArrays(
              appState.intersect.map.intersectionlines.victim_end_latlng
            ),
          ]}
          // onMouseOver={(e) => e.target.openPopup()}
          color={"red"}
          weight={5}
          //onMouseOut={(e) => e.target.closePopup()}
        ></Polyline>

        {appState.intersect.map.isSimulated ? (
          <DriftMarker
            draggable={true}
            position={appState.intersect.map.intersectionlines.user_latlng}
            //duration={appState.intersect.map.user_duration}
            duration={appState.intersect.map.user_duration}
            keepAtCenter={true}
          >
            <Popup>
              Start Time :{appState.intersect.map.usertime.st}
              <br></br>
              End Time :{appState.intersect.map.usertime.et}
            </Popup>
            <Tooltip>You</Tooltip>
          </DriftMarker>
        ) : (
          <Marker
            position={appState.intersect.map.intersectionlines.user_latlng}
          >
            <Popup>
              Start Time :{appState.intersect.map.usertime.st}
              <br></br>
              End Time :{appState.intersect.map.usertime.et}
            </Popup>
            <Tooltip>You</Tooltip>
          </Marker>
        )}
        {appState.intersect.map.isSimulated ? (
          <DriftMarker
            draggable={true}
            //icon={new Icon(<UserAddOutlined />)}
            position={appState.intersect.map.intersectionlines.victim_latlng}
            // duration={appState.intersect.map.victim_duration}
            duration={appState.intersect.map.victim_duration}
            keepAtCenter={true}
          >
            <Popup>
              Start Time :{appState.intersect.map.victimtime.st}
              <br></br>
              End Time :{appState.intersect.map.victimtime.et}
            </Popup>
            <Tooltip>Victim</Tooltip>
          </DriftMarker>
        ) : (
          <Marker
            position={appState.intersect.map.intersectionlines.victim_latlng}
          >
            <Popup>
              Start Time :{appState.intersect.map.victimtime.st}
              <br></br>
              End Time :{appState.intersect.map.victimtime.et}
            </Popup>
            <Tooltip>Victim</Tooltip>
          </Marker>
        )}
      </Map>
    </div>
  );
};

export default Intersectmap;

// class plotmap extends Component {
//   state = {
//     user_latlng: { lat: 0, lng: 0 },
//     user_end_latlng: { lat: 0, lng: 0 },

//     victim_latlng: { lat: 0, lng: 0 },
//     victim_end_latlng: { lat: 0, lng: 0 },

//     isSimulated: false,
//     user_duration: 0,
//     victim_duration: 0,
//     speedFactor: 1,
//     total_trip_start_time: "",
//     total_trip_end_time: "",
//     Timerange: [],

//     usertime: {},
//     victimtime: {},

//     isTimerRunning: false,
//   };

//   async componentDidMount() {
//     this.draw();
//   }

//   reset = async () => {
//     const [
//       usr_start_cords,
//       usr_end_cords,
//       vic_start_cords,
//       vic_end_cords,
//     ] = this.props.points;

//     const Timerange = this.props.points
//       .map((f) => moment(f.starttime))
//       .sort((a, b) => a - b)
//       .filter((f, i) => i == 0 || i == this.props.points.length - 1);
//     console.log(Timerange);

//     console.log(usr_start_cords, usr_end_cords, vic_start_cords, vic_end_cords);

//     await this.setState({
//       Timerange: Timerange,
//       user_latlng: usr_start_cords,
//       user_end_latlng: usr_end_cords,
//       victim_latlng: vic_start_cords,
//       victim_end_latlng: vic_end_cords,
//       user_duration: 10,
//       victim_duration: 10,
//       isSimulated: false,
//     });
//   };
//   draw = async () => {
//     const [
//       usr_start_cords,
//       usr_end_cords,
//       vic_start_cords,
//       vic_end_cords,
//     ] = this.props.points;
//     console.log(usr_start_cords, usr_end_cords, vic_start_cords, vic_end_cords);

//     const userDuration = Math.abs(
//       moment(usr_start_cords.starttime).diff(
//         moment(usr_end_cords.starttime),
//         "ms"
//       )
//     );
//     const usertime = {
//       st: usr_start_cords.starttime,
//       et: usr_end_cords.starttime,
//     };

//     const victmDuration = Math.abs(
//       moment(vic_start_cords.starttime).diff(
//         moment(vic_end_cords.starttime),
//         "ms"
//       )
//     );
//     const victimtime = {
//       st: vic_start_cords.starttime,
//       et: vic_end_cords.starttime,
//     };
//     await this.setState(
//       {
//         usertime: usertime,
//         victimtime: victimtime,
//         user_latlng: usr_start_cords,
//         user_end_latlng: usr_end_cords,
//         victim_latlng: vic_start_cords,
//         victim_end_latlng: vic_end_cords,
//         user_duration: userDuration / this.state.speedFactor,
//         victim_duration: victmDuration / this.state.speedFactor,
//       },
//       () => console.log("draw", this.state)
//     );
//   };
//   pointArrays = (f) => {
//     return [f.lat, f.lng];
//   };
//   simulate = async () => {
//     const [
//       usr_start_cords,
//       usr_end_cords,
//       vic_start_cords,
//       vic_end_cords,
//     ] = this.props.points;
//     console.log(usr_start_cords, usr_end_cords, vic_start_cords, vic_end_cords);

//     const Timerange = this.props.points
//       .map((f) => f.starttime)
//       .sort((a, b) => a - b)
//       .filter((f, i) => i == 0 || i == this.props.points.length - 1);
//     console.log("simpualte Timerange", Timerange);

//     const userDuration = Math.abs(
//       moment(usr_start_cords.starttime).diff(
//         moment(usr_end_cords.starttime),
//         "ms"
//       )
//     );

//     const victmDuration = Math.abs(
//       moment(vic_start_cords.starttime).diff(
//         moment(vic_end_cords.starttime),
//         "ms"
//       )
//     );

//     const usertime = {
//       st: usr_start_cords.starttime,
//       et: usr_end_cords.starttime,
//     };

//     const victimtime = {
//       st: vic_start_cords.starttime,
//       et: vic_end_cords.starttime,
//     };

//     await this.setState(
//       {
//         usertime: usertime,
//         victimtime: victimtime,

//         Timerange: Timerange,
//         isSimulated: true,

//         user_latlng: this.state.user_end_latlng,
//         user_end_latlng: this.state.user_latlng,
//         victim_latlng: this.state.victim_end_latlng,
//         victim_end_latlng: this.state.victim_latlng,
//         user_duration: userDuration / this.state.speedFactor,
//         victim_duration: victmDuration / this.state.speedFactor,
//       },
//       () => console.log("INTER simulate", this.state)
//     );
//   };

//   incSpeedFactor = () => {
//     console.log("Inc speed factor");
//     const val = this.state.speedFactor * 2;
//     if (val <= 32) this.setState({ speedFactor: val });
//   };
//   decSpeedFactor = () => {
//     const val = this.state.speedFactor / 2;
//     if (val > 0) this.setState({ speedFactor: val });
//   };
//   render() {
//     ///const position = [this.state.user_latlng.lat, this.state.user_latlng.lng];
//     return (
//       <div>
//         <Row>
//           <Col span={4}>
//             {!this.state.isSimulated ? (
//               <Button
//                 style={{ fontWeight: "bold", fontSize: "14px", height: "44px" }}
//                 type="primary"
//                 onClick={() => this.simulate()}
//               >
//                 Simulate
//               </Button>
//             ) : (
//               <Button
//                 style={{ fontWeight: "bold", fontSize: "14px", height: "44px" }}
//                 type="danger"
//                 onClick={() => this.reset()}
//               >
//                 Reset
//               </Button>
//             )}
//           </Col>
//           {/* <Col span={2}>
//             <Clock isTimerRunning={this.state.isTimerRunning} />
//           </Col> */}
//           <Col style={{ padding: "4px" }} span={16}>
//             {this.state.Timerange.length > 0 && (
//               <Time
//                 Timerange_st={this.state.Timerange[0]}
//                 Timerange_ed={this.state.Timerange[1]}
//                 speedfactor={this.state.speedFactor}
//                 isSimulated={this.state.isSimulated}
//               />
//             )}
//           </Col>
//           <Col span={4}>
//             {!this.state.isSimulated && (
//               <Row>
//                 <Col span={24} offset={1}>
//                   <BackwardFilled
//                     onClick={() => this.decSpeedFactor()}
//                     style={{ fontSize: "24px", cursor: "pointer" }}
//                   />{" "}
//                   <span style={{ fontSize: "24px" }}>
//                     x{this.state.speedFactor}{" "}
//                   </span>
//                   <ForwardFilled
//                     onClick={() => this.incSpeedFactor()}
//                     style={{ fontSize: "24px", cursor: "pointer" }}
//                   />
//                 </Col>
//               </Row>
//             )}
//           </Col>
//         </Row>
//         <div style={{ height: "10px", display: "block" }}></div>
//         <Map center={this.props.position} zoom={16}>
//           <TileLayer
//             attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           <Polyline
//             positions={[
//               this.pointArrays(this.state.user_latlng),
//               this.pointArrays(this.state.user_end_latlng),
//             ]}
//             // onMouseOver={(e) => e.target.openPopup()}
//             color={"yellow"}
//             //onMouseOut={(e) => e.target.closePopup()}
//           ></Polyline>
//           <Polyline
//             positions={[
//               this.pointArrays(this.state.victim_latlng),
//               this.pointArrays(this.state.victim_end_latlng),
//             ]}
//             // onMouseOver={(e) => e.target.openPopup()}
//             color={"red"}
//             //onMouseOut={(e) => e.target.closePopup()}
//           ></Polyline>
//           <DriftMarker
//             position={this.state.user_latlng}
//             duration={this.state.user_duration}
//             keepAtCenter={true}
//           >
//             <Popup>
//               Start Time :{this.state.usertime.st}
//               <br></br>
//               End Time :{this.state.usertime.et}
//             </Popup>
//             <Tooltip>You</Tooltip>
//           </DriftMarker>

//           <DriftMarker
//             position={this.state.victim_latlng}
//             duration={this.state.victim_duration}
//             keepAtCenter={true}
//           >
//             <Popup>
//               Start Time :{this.state.victimtime.st}
//               <br></br>
//               End Time :{this.state.victimtime.et}
//             </Popup>
//             <Tooltip>Victim</Tooltip>
//           </DriftMarker>
//         </Map>
//       </div>
//     );
//   }
// }
