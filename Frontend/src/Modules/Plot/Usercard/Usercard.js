// import React, { Component } from "react";
// import { Row, Col, Button } from "antd";
// import Svg from "../../../SVG/women";
// import "./usercard.scss";
// export default class Usercard extends Component {
//   showModal = () => {
//     this.props.showModal();
//   };

//   render() {
//     return (
//       <>
//         <div style={{ marginBottom: "15px", marginRight: "10px" }}>
//           <Row className={"usercard"}>
//             <Col className={"usercard-cols"} xs={{ span: 4 }} sm={{ span: 4 }}>
//               {<Svg />}
//             </Col>
//             <Col
//               className={"usercard-cols"}
//               xs={{ span: 19, offset: 1 }}
//               sm={{ span: 19, offset: 1 }}
//             >
//               <Row>
//                 <Col span={24}>NAme User</Col>
//                 <Col span={24}>Age : </Col>
//                 <Col span={24}>
//                   <span>+ve on :</span>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//           <Row className="usercard">
//             <Col span={12}>
//               <Button style={{ fontSize: "14px" }} type="link">
//                 Intersect
//               </Button>
//             </Col>
//             <Col span={12}>
//               <Button
//                 style={{ fontSize: "14px" }}
//                 onClick={() => this.showModal()}
//                 type="link"
//               >
//                 Show on Map
//               </Button>
//             </Col>
//           </Row>
//         </div>
//       </>
//     );
//   }
// }
