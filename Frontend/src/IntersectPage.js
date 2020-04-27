import React, { useState, useContext, useEffect } from "react";
//import { responce } from "./Components/Intersect/responce";
import IntersectUserCard from "./Components/Intersect/IntersectUsercard";
import Intersectmap from "./Components/Intersect/Intersectmap";
import {
  Row,
  Col,
  Divider,
  Modal,
  Button,
  Collapse,
  Result,
  Badge,
} from "antd";
import { appContext } from "./Contexts/AppContext";
import "./Components/Intersect/intersect.scss";
import IntersectUserCardList from "./Components/Intersect/IntersectUserCardList";
import axios from "axios";
import Bubble from "./Components/Stats/Bubble";
import HeatMap from "./Components/Stats/HeatMap";
import NetworkGraph from "./Components/Stats/NetworkGraph";
const IntersectPage = (props) => {
  const { appState, appDispatch } = useContext(appContext);

  const initialState = {
    visible: false,
    //position: [],
    //showMap: false,
    //points: [],
  };
  const [state, setState] = useState(initialState);
  const showModal = () => {
    setState({ ...state, visible: true });
  };
  const handleOk = (e) => {
    console.log(e);
    setState({ ...state, visible: false });
  };

  const handleCancel = (e) => {
    console.log(e);
    setState({ ...state, visible: false });
  };

  // const renderIntersect = (intersection_point, points) => {
  //   console.log(points);
  //   setState({
  //     ...state,
  //     showMap: true,
  //     position: intersection_point,
  //     points: points,
  //   });
  // };

  return (
    <div>
      <div style={{ display: "block", height: "10px" }}></div>

      <Row justify="space-around">
        {/* <Col
      style={{ height: "15px", display: "block" }}
      sm={{ span: 24 }}
    ></Col> */}
        <Col sm={{ span: 6, offset: 1 }} xs={{ span: 24 }} className="column">
          <Row justify="space-around">
            <Col sm={{ span: 23, offset: 1 }}>
              {" "}
              {/* <Button
                className="intersect-btn-show-all"
                //  style={{ borderColor: "#ce3838 !important" }}
              >
                Show all Intersected Me
              </Button>{" "} */}
              <span>Total Encounters </span>
              <Badge count={appState.intersect.IntersectedVictims.length} />
            </Col>
            <Col sm={{ span: 24 }} style={{ height: "10px" }}></Col>
            <Col
              span={20}
              id="style-3"
              style={{ overflowY: "scroll", height: "75vh" }}
            >
              <IntersectUserCardList />

              {/* {responce.map((f, i) => (
                <IntersectUserCard
                  key={i}
                  // showModal={showModal}
                  data={f}
                  //renderIntersect={renderIntersect}
                />
              ))} */}
            </Col>
          </Row>
        </Col>
        <Col sm={{ span: 16, offset: 1 }} xs={{ span: 24 }} className="column">
          {appState.width > 800 ? (
            appState.intersect.showMap ? (
              // <Intersectmap position={state.position} points={state.points} />
              <Intersectmap />
            ) : (
              <Result title="Expand 'Intersections', click 'Plot Intersection'" />
            )
          ) : (
            <>
              <Modal
                title="MAP"
                visible={state.visible}
                // onOk={handleOk}
                // onCancel={handleCancel}
                centered={false}
                footer={null}
              >
                {appState.intersect.showMap}&&{" "}
                <Intersectmap position={state.position} />
              </Modal>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default IntersectPage;
