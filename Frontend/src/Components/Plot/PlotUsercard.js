import React, { Component, useContext } from "react";
import { Row, Col, Button } from "antd";
import Women from "../../SVG/women";
import Man from "../../SVG/Man";
import "./plotusercard.scss";
import { appContext } from "../../Contexts/AppContext";
const PlotUsercard = (props) => {
  const { appState, appDispatch } = useContext(appContext);

  // showModal = () => {
  //   this.props.showModal();
  // };
  const showOnMap = (id) => {
    let selectedVictim = appState.victimsList.filter((f) => f._id === id);
    selectedVictim = Object.assign({}, ...selectedVictim);
    selectedVictim.center_position = selectedVictim.cords[0];

    console.log("Seleted victim", selectedVictim);

    appDispatch({
      type: "SELECTED_VICTIM",
      payload: { selectedVictim: selectedVictim },
    });

    appDispatch({
      type: "TOGGLE_MODAL_PLOT_MAP",
      payload: { visible: true },
    });
  };
  return (
    <>
      <div
        style={{ marginBottom: "15px", marginRight: "10px" }}
        className={
          appState.selectedVictim._id === props._id ? "box-shadow" : ""
        }
      >
        <Row className={"usercard"}>
          <Col className={"usercard-cols"} xs={{ span: 4 }} sm={{ span: 4 }}>
            {props.gender === "male" ? <Man /> : <Women />}
          </Col>
          <Col
            className={"usercard-cols"}
            xs={{ span: 19, offset: 1 }}
            sm={{ span: 19, offset: 1 }}
          >
            <Row>
              <Col span={7}>Name</Col>
              <Col span={1}>:</Col>
              <Col span={15}>{props.username}</Col>
              <Col span={7}>Age </Col>
              <Col span={1}>:</Col> <Col span={15}>{props.age}</Col>
              <Col span={7}>
                <span>+ve on</span>
              </Col>
              <Col span={1}>:</Col>
              <Col span={15}>{props.testeddate}</Col>
            </Row>
          </Col>
        </Row>
        <Row className="usercard-bottom">
          <Col span={12} offset={12}>
            <Button
              style={{ fontSize: "14px", color: "black", fontWeight: "bold" }}
              onClick={() => showOnMap(props._id)}
              type="link"
            >
              Show on Map
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PlotUsercard;

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
