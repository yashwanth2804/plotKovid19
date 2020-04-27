// import React, { Component } from "react";
// import Clock from "../../../SVG/Clock";
// import { Row, Col } from "antd";
// var moment = require("moment");
// export default class Time extends Component {
//   state = {
//     startTime: "",
//     endTime: "",
//     intervalId: "",
//     time: 1000,

//     isTimerRunning: true,
//   };

//   async componentDidMount() {
//     console.log("CDM Timer CDM ", this.props);
//     if (this.props.isSimulated) {
//       var intervalId = setInterval(
//         this.timer,
//         this.state.time / this.props.speedfactor
//       );
//       await this.setState({
//         intervalId: intervalId,
//         isTimerRunning: true,
//         startTime: this.props.Timerange_st,
//         endTime: this.props.Timerange_ed,
//       });
//     } else {
//       clearInterval(this.state.intervalId);
//       this.setState({ isTimerRunning: false });
//     }

//     // var intervalId = setInterval(
//     //   this.timer,
//     //   this.state.time / this.props.speedfactor
//     // );

//     //this.setState({ intervalId: intervalId });
//     // await this.setState(
//     //   {
//     //     startTime: this.props.Timerange_st,
//     //     endTime: this.props.Timerange_ed,
//     //   },
//     //   () => console.log("CDM ", this.state)
//     // );
//   }
//   timer = () => {
//     if (!moment(this.state.startTime).isSameOrAfter(this.state.endTime)) {
//       this.setState({
//         startTime: moment(this.state.startTime).add(1, "s"),
//       });
//       console.log("===");
//     } else {
//       clearInterval(this.state.intervalId);
//       console.log("Stoppring interval");
//       this.setState({ isTimerRunning: false });
//     }
//   };
//   componentWillUnmount() {
//     clearInterval(this.state.intervalId);
//     //this.props.stopTimer();
//   }

//   async componentWillReceiveProps(newProps) {
//     console.log("CWP_TIMER", newProps);
//     if (newProps.isSimulated) {
//       var intervalId = setInterval(
//         this.timer,
//         this.state.time / newProps.speedfactor
//       );
//       await this.setState({
//         intervalId: intervalId,
//         isTimerRunning: true,
//         startTime: newProps.Timerange_st,
//         endTime: newProps.Timerange_ed,
//       });
//     } else {
//       clearInterval(this.state.intervalId);
//       this.setState({ isTimerRunning: false });
//     }

//     // await this.setState(
//     //   {
//     //     startTime: newProps.Timerange_st,
//     //     endTime: newProps.Timerange_ed,
//     //   },
//     //   () => console.log("CWR ", this.state)
//     // );
//   }

//   render() {
//     return (
//       <div>
//         <Row>
//           <Col span={2}>
//             <Clock isTimerRunning={this.state.isTimerRunning} />
//           </Col>
//           <Col style={{ fontSize: "20px" }} span={22}>
//             {" "}
//             {moment(this.state.startTime).format("MMMM,Do,YYYY,h:mm:ss a")}
//           </Col>
//         </Row>
//       </div>
//     );
//   }
// }
