// import React, { Component } from "react";
// import { Row, Col, Button, Collapse, Badge } from "antd";
// import Svg from "../../../SVG/women";
// import "./usercard.scss";
// import * as turf from "@turf/turf";
// const { Panel } = Collapse;
// export default class Usercard extends Component {
//   showModal = () => {
//     this.props.showModal();
//   };
//   renderIntersect = (f) => {
//     var line1 = turf.lineString([
//       [f[0].lat, f[0].lng],
//       [f[1].lat, f[1].lng],
//     ]);
//     var line2 = turf.lineString([
//       [f[2].lat, f[2].lng],
//       [f[3].lat, f[3].lng],
//     ]);
//     var intersects = turf.lineIntersect(line1, line2);

//     const intersectionPoint = intersects.features[0].geometry.coordinates;
//     this.props.renderIntersect(intersectionPoint, f);
//   };

//   componentDidMount() {}
//   render() {
//     // const yy = responce.map((f, i) => (
//     //   <Col
//     //     style={{ cursor: "pointer" }}
//     //     onClick={() => this.renderIntersect()}
//     //     span={24}
//     //   >
//     //     Intersect {i}
//     //   </Col>
//     // ));
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
//                 <Col span={24}>{this.props.data.user}</Col>
//                 <Col span={22}>
//                   <Collapse accordion>
//                     <Panel
//                       header={
//                         <>
//                           <Row>
//                             <Col span={6}>
//                               <Badge
//                                 count={this.props.data.intersectionlines.length}
//                                 className="site-badge-count-4"
//                               />
//                             </Col>
//                             <Col span={18}>Intersections</Col>
//                           </Row>
//                         </>
//                       }
//                       key="1"
//                     >
//                       <Row>
//                         {this.props.data.intersectionlines.map((f, i) => (
//                           // f.map((g) => <div>{g.lat}</div>)
//                           <Col
//                             style={{ cursor: "pointer" }}
//                             onClick={() => this.renderIntersect(f)}
//                             span={24}
//                           >
//                             Plot Intersect {i + 1}
//                           </Col>
//                         ))}
//                       </Row>
//                     </Panel>
//                   </Collapse>
//                 </Col>
//               </Row>
//             </Col>
//           </Row>
//         </div>
//       </>
//     );
//   }
// }
