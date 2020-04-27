// import React, { Component } from "react";
// import "./Card.css";
// import Step1 from "./Step1/step1";
// import Step2 from "./Step2/step2";
// import Step3 from "./Step3/step3";

// import { withRouter } from "react-router-dom";
// //import Button from "./Button/button";
// import "./Button/btn.scss";
// //import { Button } from "antd";
// import { LeftCircleOutlined } from "@ant-design/icons";
// import { Row, Col, Upload, Button, message, Progress, Divider } from "antd";
// import axios from "axios";
// import { UploadOutlined } from "@ant-design/icons";

// var generateName = require("sillyname");
// class Card extends Component {
//   state = {
//     title: "I have ...",
//     city: "",
//     country: "",
//     index: 1,
//     name: "",
//     age: 0,
//     gender: "",
//     positivedate: "",
//     healthStatus: "",
//     isAllKML: false
//   };
//   async componentDidMount() {
//     // if (this.props.name !== null || this.props.name !== "") {
//     //   console.log(this.props.name);
//     //   //this.props.history.push("/plot");
//     // }

//     const name =
//       generateName().replace(" ", "_") +
//       Math.floor(Math.random() * (99 - 10 + 1) + 10);
//     const userFromlocal = await localStorage.getItem("UserName");
//     if (userFromlocal !== null) this.props.history.push("/plot");
//     if (!userFromlocal) await localStorage.setItem("UserName", name);
//     await this.setState({ name: await localStorage.getItem("UserName") }, () =>
//       console.log(this.state)
//     );
//   }
//   step1updateIndex = obj => {
//     const updatedindex = this.state.index + 1;

//     console.log(obj);
//     this.setState({ index: updatedindex, healthStatus: obj.value });
//     console.log("update index");
//   };

//   step2updateIndex = async obj => {
//     const updatedindex = this.state.index + 1;
//     console.log("---------->", obj);

//     // save to db
//     // saveUser
//     const { age, gender, positiveDate, city, country } = obj;
//     console.log(obj);

//     this.setState(
//       {
//         index: updatedindex,
//         age: age,
//         gender: gender,
//         positivedate: positiveDate,
//         city: city,
//         country: country
//       },
//       () => console.log("==> ", this.state)
//     );

//     const query =
//       "username=" +
//       this.state.name +
//       "&" +
//       "age=" +
//       age +
//       "&" +
//       "gender=" +
//       gender +
//       "&" +
//       "city=" +
//       city +
//       "&" +
//       "country=" +
//       country +
//       "&" +
//       "positive=" +
//       positiveDate;
//     console.log("http://localhost:8080/app/saveUser?" + encodeURI(query));
//     const url = "http://localhost:8080/app/saveUser?" + encodeURI(query);
//     const resp = await axios.get(url);
//     console.log(resp);
//     await localStorage.setItem("mongoID", resp.data);
//   };
//   decreaseIndex = () => {
//     const updatedindex = this.state.index - 1;

//     this.setState({ index: updatedindex });
//   };

//   setHealthStatus = hs => {
//     this.setState({ setHealthStatus: hs });
//   };
//   setCityState = (city, country) => {
//     this.setState({ city: city, country: country }, () =>
//       console.log(this.state)
//     );
//   };
//   updateGender = g => {
//     this.setState({ gender: g });
//   };
//   updateAge = a => {
//     this.setState({ age: a });
//   };
//   onChange = ({ file, fileList }) => {
//     console.log(fileList);
//   };

//   render() {
//     return (
//       <div className="card">
//         {/* <div className={"card-title"}> {this.state.title}</div> */}
//         {this.state.index == 1 ? (
//           <Step1
//             setHealthStatus={this.setHealthStatus}
//             step1updateIndex={this.step1updateIndex}
//             decreaseIndex={this.decreaseIndex}
//             width={this.props.width}
//           />
//         ) : (
//           ""
//         )}
//         {this.state.index == 2 ? (
//           <Step2
//             setCityState={this.setCityState}
//             name={this.state.name}
//             updateAge={this.updateAge}
//             updateGender={this.updateGender}
//             step2updateIndex={this.step2updateIndex}
//             decreaseIndex={this.decreaseIndex}
//           />
//         ) : (
//           ""
//         )}
//         {/** Step 3  */}
//         {this.state.index == 3 ? (
//           <>
//             {" "}
//             <Step3
//               setCityState={this.setCityState}
//               name={this.state.name}
//               updateAge={this.updateAge}
//               updateGender={this.updateGender}
//               step2updateIndex={this.step2updateIndex}
//               decreaseIndex={this.decreaseIndex}
//             />
//           </>
//         ) : (
//           ""
//         )}
//       </div>
//     );
//   }
// }
// export default withRouter(Card);
