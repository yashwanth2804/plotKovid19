import React, { Component, useState } from "react";
import { Divider, Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./section.scss";

const Section = () => {
  const [selectedBtn, setSelectedBtn] = useState(1);
  return (
    <div>
      <Divider />

      <Row align="bottom">
        <Col sm={{ span: 3, offset: 4 }} xs={{ span: 10, offset: 2 }}>
          <Link className="link" to="/plot">
            <button
              className={
                selectedBtn === 1 ? "plot-btn selected-btn" : "plot-btn"
              }
              //className="plot-btn selected-btn"
              onClick={() => setSelectedBtn(1)}
            >
              PLOT
            </button>
          </Link>
        </Col>
        <Col sm={{ span: 3, offset: 1 }} xs={{ span: 10, offset: 1 }}>
          <Link className="link" to="/intersect">
            <button
              //className="intersect-btn"
              className={
                selectedBtn === 2
                  ? "intersect-btn selected-btn"
                  : "intersect-btn"
              }
              onClick={() => setSelectedBtn(2)}
            >
              Intersect With Me{" "}
            </button>
          </Link>
        </Col>
        <Col sm={{ span: 3, offset: 1 }} xs={{ span: 10, offset: 2 }}>
          <Link className="link" to="/stats">
            {" "}
            <button
              //className="stats-btn"
              onClick={() => setSelectedBtn(3)}
              className={
                selectedBtn === 3 ? "stats-btn selected-btn" : "stats-btn"
              }
            >
              stats
            </button>
          </Link>
        </Col>
        <Col sm={{ span: 3, offset: 1 }} xs={{ span: 10, offset: 1 }}>
          <Link className="link" to="/settings">
            {" "}
            <button
              disabled
              className={
                selectedBtn === 4 ? "settings-btn selected-btn" : "settings-btn"
              }
              onClick={() => setSelectedBtn(4)}
            >
              Settings{" "}
            </button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Section;
