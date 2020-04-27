// import React, { Component } from "react";
// import { Row, Col, Divider, Modal, Button, Collapse, Result } from "antd";
// import "./intersect.scss";
// import { Link } from "react-router-dom";
// import {
//   SearchOutlined,
//   HeartTwoTone,
//   RightSquareTwoTone,
// } from "@ant-design/icons";
// import Grid from "antd/lib/card/Grid";
// import Usercard from "../Intersect/Usercard/Usercard";
// import Intersectmap from "./IntersectMap/Intersectmap";
// import { responce } from "./SampleResponce/responce";

// const { Panel } = Collapse;
// export default class Intersect extends Component {
//   state = { visible: false, position: [], showMap: false, points: [] };
//   showModal = () => {
//     this.setState({
//       visible: true,
//     });
//   };
//   handleOk = (e) => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };

//   handleCancel = (e) => {
//     console.log(e);
//     this.setState({
//       visible: false,
//     });
//   };

//   renderIntersect = (intersection_point, points) => {
//     console.log(points);
//     this.setState({
//       showMap: true,
//       position: intersection_point,
//       points: points,
//     });
//   };
//   render() {
//     return (
//       <div>
//         <div style={{ display: "block", height: "10px" }}></div>
//         <Row justify="space-around">
//           {/* <Col
//             style={{ height: "15px", display: "block" }}
//             sm={{ span: 24 }}
//           ></Col> */}
//           <Col sm={{ span: 6, offset: 1 }} xs={{ span: 24 }}>
//             <Row justify="space-around">
//               <Col sm={{ span: 23, offset: 1 }}>
//                 {" "}
//                 <Button
//                   className="intersect-btn-show-all"
//                   //  style={{ borderColor: "#ce3838 !important" }}
//                 >
//                   Show all Intersected Me
//                 </Button>{" "}
//               </Col>
//               <Col sm={{ span: 24 }} style={{ height: "10px" }}></Col>
//               <Col
//                 span={20}
//                 id="style-3"
//                 style={{ overflowY: "scroll", height: "75vh" }}
//               >
//                 {responce.map((f) => (
//                   <Usercard
//                     showModal={this.showModal}
//                     data={f}
//                     renderIntersect={this.renderIntersect}
//                   />
//                 ))}
//               </Col>
//             </Row>
//           </Col>
//           <Col
//             sm={{ span: 16, offset: 1 }}
//             xs={{ span: 24 }}
//             //className="plot-map"
//           >
//             {this.props.width > 800 ? (
//               this.state.showMap ? (
//                 <Intersectmap
//                   position={this.state.position}
//                   points={this.state.points}
//                 />
//               ) : (
//                 <Result title="Expand 'Intersections', click 'Plot Intersection'" />
//               )
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
//                   {this.state.showMap}&&{" "}
//                   <Intersectmap position={this.state.position} />
//                 </Modal>
//               </>
//             )}
//           </Col>
//         </Row>
//       </div>
//     );
//   }
// }
