import React, { useEffect } from "react";
import Bubble from "./Components/Stats/Bubble";
import HeatMap from "./Components/Stats/HeatMap";
import NetworkGraph from "./Components/Stats/NetworkGraph";
import { Row, Col } from "antd";
import Table from "./Components/Stats/Table";
import "./Statspage.scss";
import TestGraph from "./Components/Stats/TestGraph";

const StatsPage = () => {
  return (
    <div style={{ padding: "30px" }}>
      <Row justify="space-around" gutter={[8, 8]}>
        <Col className={"column_shadow"} span={8}>
          <h2>Data</h2> <Bubble />
        </Col>
        <Col className={"column_shadow"} span={8}>
          <h2>Last 30 days Travel Activity</h2> <HeatMap />
        </Col>
        <Col
          className={"column_shadow"}
          style={{ overflow: "hidden" }}
          span={8}
        >
          <h2>Network graph</h2>{" "}
          <div>
            <NetworkGraph />
          </div>
        </Col>
        <Col className={"column_shadow"} span={10}>
          <h2>Ranking</h2>{" "}
          <div>
            <Table />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StatsPage;
