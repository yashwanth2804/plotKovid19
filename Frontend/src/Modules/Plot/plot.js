// import React, { Component } from "react";
// import { Row, Col, Divider, Modal, Select } from "antd";
// import "./plot.scss";
// import { Link } from "react-router-dom";
// import {
//   SearchOutlined,
//   HeartTwoTone,
//   RightSquareTwoTone
// } from "@ant-design/icons";
// import Grid from "antd/lib/card/Grid";
// import Usercard from "./Usercard/Usercard";
// import Plotmap from "./PLotMap/plotmap";

// const { Option } = Select;
// export default class plot extends Component {
//   state = { visible: false };
//   showModal = () => {
//     this.setState({
//       visible: true
//     });
//   };
//   handleOk = e => {
//     console.log(e);
//     this.setState({
//       visible: false
//     });
//   };

//   handleCancel = e => {
//     console.log(e);
//     this.setState({
//       visible: false
//     });
//   };
//   render() {
//     return (
//       <div>
//         <div style={{ display: "block", height: "10px" }}></div>
//         <Row justify="space-around">
//           <Col sm={{ span: 6, offset: 1 }} xs={{ span: 24 }}>
//             <Row justify="space-around">
//               <Col xs={{ span: 18, offset: 1 }} sm={{ span: 19, offset: 1 }}>
//                 <input
//                   placeholder="Search city or user"
//                   type="text"
//                   style={{ height: "7vh", width: "100%" }}
//                   className="input"
//                 />
//                 <ul
//                 className="search-list_Settings"
//                 style={{ display: state.showPlaceresults }}
//               >
//                 {state.searchPlaceresults &&
//                   state.searchPlaceresults.map((f, i) => {
//                     return (
//                       <li
//                         className={i % 2 === 0 ? "row-odd" : ""}
//                         key={i}
//                         onClick={() => placeSelected(f[0], f[2])}
//                       >
//                         <span>{f[0] + " ," + f[2]}</span>
//                       </li>
//                     );
//                   })}
//               </ul>

//               </Col>
//               <Col xs={{ span: 4 }} sm={{ span: 2, offset: 1 }}>
//                 {/* <SearchOutlined twoToneColor="#eb2f96" />{" "}
//                 <HeartTwoTone twoToneColor="#eb2f96" /> */}
//                 <RightSquareTwoTone style={{ fontSize: "3rem" }} />
//               </Col>
//               <Col sm={{ span: 6, offset: 1 }}>
//                 <span>Sort By : </span>
//               </Col>
//               <Col sm={{ span: 16 }}>
//                 <Select
//                   defaultValue="lucy"
//                   style={{ width: "80%" }}
//                   //onChange={handleChange}
//                 >
//                   <Option value="jack">Travel Distance</Option>
//                   <Option value="lucy">Lock Down period</Option>
//                   <Option value="disabled">+ve Date</Option>
//                 </Select>
//               </Col>
//             </Row>
//             <Divider />
//             <Row justify="space-around">
//               <Col span={20} id="style-3" className="user-content">
//                 <Usercard showModal={this.showModal} />
//                 <Usercard />
//                 <Usercard /> <Usercard /> <Usercard /> <Usercard /> <Usercard />
//               </Col>
//             </Row>
//           </Col>
//           <Col
//             sm={{ span: 16, offset: 1 }}
//             xs={{ span: 24 }}
//             //className="plot-map"
//           >
//             {this.props.width > 800 ? (
//               <Plotmap />
//             ) : (
//               <>
//                 <Modal
//                   title="MAP [press back to exit]"
//                   visible={this.state.visible}
//                   onOk={this.handleOk}
//                   onCancel={this.handleCancel}
//                   // centered={false}
//                   footer={null}
//                 >
//                   <Plotmap />
//                 </Modal>
//               </>
//             )}
//           </Col>
//         </Row>
//       </div>
//     );
//   }
// }
