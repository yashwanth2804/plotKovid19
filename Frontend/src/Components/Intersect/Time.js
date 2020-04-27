import React, { Component, useState, useContext, useEffect } from "react";
import Clock from "../../SVG/Clock";
import { Row, Col } from "antd";
import { appContext } from "../../Contexts/AppContext";
var moment = require("moment");

const TimeComponent = () => {
  const { appState, appDispatch } = useContext(appContext);

  const {
    Timerange,
    isSimulated,
    speedFactor,
    intersectionlines,
  } = appState.intersect.map;

  const [intervalId, setIntervalId] = useState(null);
  const [Time, setTime] = useState(Timerange[0]);
  const [isTimerRunning, setisTimerRunning] = useState(true);
  const timer_ = () => {
    console.log(Time, Timerange[1]);
    const incOnsec = moment(Time).add(1, "s");
    setTime("Dc");
    console.log("...", Time);
    // if (!moment(Time).isSameOrAfter(Timerange[1])) {
    //   // this.setState({
    //   //   startTime: moment(Timerange[0]).add(1, "s"),
    //   // });
    //   const incOnsec = moment(Time).add(1, "s");
    //   console.log("...", incOnsec.toISOString(), Timerange[1]);
    //   setTime(incOnsec.toString());

    //   console.log("===");
    // } else {
    //   clearInterval();
    //   console.log("Stoppring interval");
    // }
  };

  useEffect(() => {
    // if (isSimulated) {
    const timer = window.setInterval(() => {
      setTime((prevTime) => {
        console.log("Interval");
        let updatedUserState = false;
        let updateVictimState = false;

        if (!moment(prevTime).isSameOrAfter(Timerange[1])) {
          const g = moment(prevTime).add(1, "s").toISOString();
          if (
            new Date(g) > new Date(intersectionlines.user_latlng.starttime) &&
            !updatedUserState
          ) {
            const intersectionLines_ = {
              user_latlng: intersectionlines.user_end_latlng,
              user_end_latlng: intersectionlines.user_latlng,
            };
            appDispatch({
              type: "UPDATE_USER_CORDS",
              payload: { intersectionlines: intersectionLines_ },
            });

            updatedUserState = true;
          }

          if (
            new Date(g) > new Date(intersectionlines.victim_latlng.starttime) &&
            !updateVictimState
          ) {
            const intersectionLines_ = {
              victim_latlng: intersectionlines.victim_end_latlng,
              victim_end_latlng: intersectionlines.victim_latlng,
            };

            appDispatch({
              type: "UPDATE_USER_CORDS",
              payload: { intersectionlines: intersectionLines_ },
            });
            updateVictimState = true;
          }

          appDispatch({ type: "CLOCK_TIMER", payload: { clockTimer: g } });
          return g;
        } else {
          setisTimerRunning(false);
        }
      });
    }, 1000 / speedFactor);
    // setIntervalId(timer);
    // } else {
    //   console.log("SIMUlation ended");
    //   window.clearInterval(intervalId);
    // }

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  // useEffect(() => {
  //   if (isSimulated) {
  //     //var interval_Id = setInterval(timer, 3000 / speedFactor);
  //     var interval_Id = setInterval(timer, 1000);
  //     setIntervalId(interval_Id);
  //     // await this.setState({
  //     //   intervalId: intervalId,
  //     //   isTimerRunning: true,
  //     //   startTime: this.props.Timerange_st,
  //     //   endTime: this.props.Timerange_ed,
  //     // });
  //   } else {
  //     clearInterval(intervalId);
  //   }
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  return (
    <div>
      {isSimulated && (
        <Row>
          <Col span={2}>
            <Clock isTimerRunning={isTimerRunning} />
          </Col>
          <Col style={{ fontSize: "20px" }} span={22}>
            {
              moment(Time)
                /// .parseZone(Time)
                .local()
                .format("dddd, MMMM Do YYYY, h:mm:ss a")
              //moment(Time).format("MMMM,Do,YYYY,h:mm:ss a").toISOString()
              //.format("MMMM,Do,YYYY,h:mm:ss a")
            }
          </Col>
        </Row>
      )}
    </div>
  );
};

export default TimeComponent;

// class time extends Component {
//   state = {
//     startTime: "",
//     endTime: "",
//     intervalId: "",
//     time: 1000,

//     isTimerRunning: true,
//   };

//   async componentDidMount() {
//     console.log("CDM Timer CDM ", this.props);
//     console.log("[[[", this.state.time / this.props.speedfactor);
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

//   // async componentWillReceiveProps(newProps) {
//   //   console.log("[[[", this.state.time / newProps.speedfactor);
//   //   console.log("CWP_TIMER", newProps);
//   //   if (newProps.isSimulated) {
//   //     var intervalId = setInterval(
//   //       this.timer,
//   //       this.state.time / newProps.speedfactor
//   //     );
//   //     await this.setState({
//   //       intervalId: intervalId,
//   //       isTimerRunning: true,
//   //       startTime: newProps.Timerange_st,
//   //       endTime: newProps.Timerange_ed,
//   //     });
//   //   } else {
//   //     clearInterval(this.state.intervalId);
//   //     this.setState({ isTimerRunning: false });
//   //   }

//   //   // await this.setState(
//   //   //   {
//   //   //     startTime: newProps.Timerange_st,
//   //   //     endTime: newProps.Timerange_ed,
//   //   //   },
//   //   //   () => console.log("CWR ", this.state)
//   //   // );
//   // }

//   render() {
//     return (
//       <div>
//         <Row>
//           <Col span={2}>
//             <Clock isTimerRunning={this.state.isTimerRunning} />
//           </Col>
//           <Col style={{ fontSize: "20px" }} span={22}>
//             {" "}
//             {
//               moment(this.state.startTime).toString()
//               //.format("MMMM,Do,YYYY,h:mm:ss a")
//             }
//           </Col>
//         </Row>
//       </div>
//     );
//   }
// }
