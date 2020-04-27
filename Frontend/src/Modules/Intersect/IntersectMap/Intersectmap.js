// import React, { Component } from "react";
// import {
//   Map,
//   TileLayer,
//   Marker,
//   Popup,
//   Tooltip,
//   Polyline,
// } from "react-leaflet";
// import { DriftMarker } from "leaflet-drift-marker";
// import { Row, Col, Button, Badge } from "antd";
// import Clock from "../../../SVG/Clock";
// import Time from "./Time";
// import { BackwardFilled, ForwardFilled } from "@ant-design/icons";
// var moment = require("moment");

// export default class plotmap extends Component {
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
