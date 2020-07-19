import React, { useContext, useEffect } from "react";
import { Row, Col, Button, Collapse, Badge } from "antd";
import Svg from "../../SVG/women";
import "./intersectusercard.scss";
import * as turf from "@turf/turf";
import { appContext } from "../../Contexts/AppContext";

import Women from "../../SVG/women";
import Man from "../../SVG/Man";

var moment = require("moment");
const { Panel } = Collapse;

const IntersectUsercard = (props) => {
  const { appState, appDispatch, renderIntersect } = useContext(appContext);
  // const renderIntersect = (f, id) => {
  //   console.log("F ", f);
  //   var line1 = turf.lineString([
  //     [f[0].lat, f[0].lng],
  //     [f[1].lat, f[1].lng],
  //   ]);
  //   var line2 = turf.lineString([
  //     [f[2].lat, f[2].lng],
  //     [f[3].lat, f[3].lng],
  //   ]);
  //   var intersects = turf.lineIntersect(line1, line2);

  //   const center = intersects.features[0].geometry.coordinates;
  //   console.log(center);

  //   let selectedUser = appState.intersect.IntersectedVictims.filter(
  //     (f) => f.id === id
  //   );

  //   selectedUser = Object.assign({}, ...selectedUser);
  //   console.log(selectedUser);
  //   const [usr_start_cords, usr_end_cords, vic_start_cords, vic_end_cords] = f;

  //   const userDuration = Math.abs(
  //     moment(usr_start_cords.starttime).diff(
  //       moment(usr_end_cords.starttime),
  //       "ms"
  //     )
  //   );
  //   const usertime = {
  //     st: usr_start_cords.starttime,
  //     et: usr_end_cords.starttime,
  //   };

  //   const victmDuration = Math.abs(
  //     moment(vic_start_cords.starttime).diff(
  //       moment(vic_end_cords.starttime),
  //       "ms"
  //     )
  //   );
  //   const victimtime = {
  //     st: vic_start_cords.starttime,
  //     et: vic_end_cords.starttime,
  //   };

  //   const map = {
  //     intersectionlines: {
  //       user_latlng: usr_start_cords,
  //       user_end_latlng: usr_end_cords,
  //       victim_latlng: vic_start_cords,
  //       victim_end_latlng: vic_end_cords,
  //     },
  //     usertime: usertime,
  //     victimtime: victimtime,

  //     user_duration: userDuration / appState.intersect.map.speedFactor,
  //     victim_duration: victmDuration / appState.intersect.map.speedFactor,
  //   };
  //   console.log("---->", map.intersectionlines);

  //   //selectedIntersectVictim  SELECTED_INTERSECTED_VICTIMS
  //   appDispatch({
  //     type: "SELECTED_INTERSECTED_VICTIMS",
  //     payload: {
  //       selectedIntersectVictim: selectedUser,
  //       center: center,
  //       map: map,
  //     },
  //   });
  //   //this.props.renderIntersect(intersectionPoint, f);
  // };

  useEffect(() => {
    console.log(props);
    console.log(props.intersectionlines);
  }, []);

  const yy = props.intersectionlines.map((f, i) => (
    <Col
      style={{ cursor: "pointer" }}
      onClick={() => renderIntersect(f, "5e943e859cd2940053f51207")}
      span={24}
      key={i}
    >
      Plot Intersect {i + 1}
    </Col>
  ));

  return (
    <>
      <div style={{ marginBottom: "15px", marginRight: "10px" }}>
        <Row className={"usercard-intersect"}>
          <Col className={"usercard-cols"} xs={{ span: 4 }} sm={{ span: 4 }}>
            {props.gender === "Male" ? <Man /> : <Women />}
          </Col>
          <Col
            className={"usercard-cols"}
            xs={{ span: 19, offset: 1 }}
            sm={{ span: 19, offset: 1 }}
          >
            <Row>
              <Col span={24}>{props.user}</Col>
              <Col span={22}>
                <Collapse accordion style={{ backgroundColor: "#5c467d2e" }}>
                  <Panel
                    header={
                      <>
                        <Row>
                          <Col span={6}>
                            <Badge
                              count={props.intersectionlines.length}
                              className="site-badge-count-4"
                            />
                          </Col>
                          <Col span={18}>Intersections</Col>
                        </Row>
                      </>
                    }
                    key="1"
                  >
                    {/* <Row>
                      {props.intersectionlines.map((f, i) => (
                        // f.map((g) => <div>{g.lat}</div>)
                        <Col
                          style={{ cursor: "pointer" }}
                          // onClick={() => renderIntersect(f, props.id)}
                          span={24}
                          key={i}
                        >
                          Plot Intersect {i + 1}
                        </Col>
                      ))}
                    </Row> */}
                    <Row>{yy}</Row>
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default IntersectUsercard;
