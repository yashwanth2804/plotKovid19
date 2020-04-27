import React, { useEffect, useState } from "react";
import "./HeatMap.scss";
import { Row, Col, Slider, Tooltip, Select, Divider } from "antd";
import Axios from "axios";
import _ from "lodash";
import * as fakeResponseHeatmap from "../../FakeResponce/StatsPage";
const { Option } = Select;

const HeatMap = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedPeople, setSelectedPeople] = useState("victimscount");
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const asyncFunc = async () => {
      const data_ = fakeResponseHeatmap.HeatMapData;
      setData(data_);
    };
    asyncFunc();
  }, []);

  useEffect(() => {
    travelLogic(data);
  }, [data]);

  const travelLogic = (data) => {
    console.log("tvl", data, selectedPeople);
    //{date: "2020-03-04T00:00:00Z", victimscount: 1, normalcount: 4, id: "5ea27f90e1ec4f7e526e4494"}
    //Get only req fields
    var data_Selected = _.map(
      data,
      _.partialRight(_.pick, ["date", selectedPeople])
    );
    const totalCounts = data_Selected.reduce((p, k) => {
      return p + k[selectedPeople];
    }, 0);

    let max = data_Selected.map((f) => f[selectedPeople]).flatMap((f) => f);
    max = _.max(max);

    const data_Selected_F = data_Selected.map((f) => {
      let percentage = f[selectedPeople] / max;
      if (percentage > 0 && percentage < 0.25) percentage = 0.25;
      if (percentage > 0.25 && percentage < 0.5) percentage = 0.5;

      if (percentage > 0.5 && percentage < 0.75) percentage = 0.75;

      if (percentage > 0.75 && percentage < 1) percentage = 1;

      return {
        date: f.date,
        count: f[selectedPeople],
        percentage: percentage,
      };
    });
    console.log(data_Selected_F);
    setSelectedData(data_Selected_F);

    console.log(totalCounts);
    setTotal(totalCounts);
  };
  const updateSelected = (v) => {
    console.log("==", v);
    setSelectedPeople(v);
  };
  useEffect(() => {
    console.log("==>>", selectedPeople);
    travelLogic(data);
  }, [selectedPeople]);

  const yy = selectedData.map((f, i) => (
    <Col key={i} className="gutter-row" span={4}>
      <Tooltip title={"" + f.count + " victims travelled on " + f.date}>
        <div
          style={{
            backgroundColor: " rgba(255, 0, 0," + f.percentage + ")",
          }}
          className={"hm"}
        />
      </Tooltip>
    </Col>
  ));
  return (
    <div>
      <Row>
        <Col span={20}>
          <Select
            value={selectedPeople}
            style={{ width: "100%" }}
            onChange={updateSelected}
          >
            {" "}
            <Option value="victimscount">Victims</Option>
            <Option value="normalcount">Normal</Option>
          </Select>
        </Col>
      </Row>
      <Divider dashed />
      <div style={{ width: "180px" }}>
        {" "}
        <Row gutter={[8, 8]}>{yy}</Row>
      </div>
    </div>
  );
};

export default HeatMap;
