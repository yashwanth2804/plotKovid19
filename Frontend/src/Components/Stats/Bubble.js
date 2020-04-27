import React, { useState, useEffect } from "react";
import {
  ResponsiveBubble,
  ResponsiveBubbleCanvas,
  ResponsiveBubbleHtml,
} from "@nivo/circle-packing";
import { Row, Col, Select } from "antd";
import Axios from "axios";
import _ from "lodash";

const { Option } = Select;

const data1 = {
  name: "a",
  color: "hsl(265, 70%, 50%)",
  children: [{}],
};

const Bubble = () => {
  // const [selected, setSelected] = useState("world");
  const [selected_type, setSelectedtype] = useState("select");
  const [selectedGeo, setSelectedGeo] = useState("world");

  const [worldData, setWorlddata] = useState([]);
  const [usacounties, setUsacounties] = useState([]);
  const [data, setData] = useState({
    name: "",
    color: "hsl(14, 70%, 50%)",
    loc: 0,
    children: [
      {
        name: "b1.1",
        color: "hsl(101, 70%, 50%)",
        loc: 1,
      },
    ],
  });
  useEffect(() => {
    //const asyncFun = async () => {};
    getWorldData();
    //asyncFun();
  }, []);

  const getIndiaData = async () => {
    const url_india =
      "https://api.covid19india.org/v2/state_district_wise.json";
    const india_data = await Axios.get(url_india);
    console.log(india_data.data);

    const resp_india_data = india_data.data;
    const groupedByStateIndia = _.groupBy(resp_india_data, (d) => d.state);
    console.log(groupedByStateIndia);
    const child = [];

    for (const st in groupedByStateIndia) {
      const stateData = Object.assign(...groupedByStateIndia[st], {});

      const districtsData = stateData.districtData.map((f) => {
        if (st === "Gujarat") console.log("===>", f);

        return { name: f.district, loc: f.confirmed };
      });

      const obj = { name: st, children: districtsData };
      child.push(obj);

      // const yy = Object.keys(gg).reduce(function (previous, key) {
      //   return previous + gg[key].loc;
      // }, 0);

      // // console.log(gg);
      // // console.log("------");
      // const obj = { name: st, loc: yy };
      // child.push(obj);
    }
    const india = {
      name: "INDIA",
      color: "red",
      children: child,
    };
    console.log(india);
    setData(india);
  };

  const getUSAdata = async () => {
    const url_counties = "https://corona.lmao.ninja/v2/jhucsse/counties";
    const usa_counties = await Axios.get(url_counties);
    console.log(usa_counties.data);

    const resp_usa_counties_data = usa_counties.data;
    const groupedByProvinceUSA = _.groupBy(
      resp_usa_counties_data,
      (d) => d.province
    );

    const child = [];

    for (const prov in groupedByProvinceUSA) {
      const counties = groupedByProvinceUSA[prov];
      const gg = counties.map((f) => {
        return { name: f.county, loc: f.stats.confirmed };
      });

      const yy = Object.keys(gg).reduce(function (previous, key) {
        return previous + gg[key].loc;
      }, 0);

      // console.log(gg);
      // console.log("------");
      const obj = { name: prov, loc: yy };
      child.push(obj);
    }
    const usa = {
      name: "USA",
      color: "red",
      children: child,
    };
    console.log(usa);
    setData(usa);
  };
  const getWorldData = async () => {
    //Countries data
    //https://corona.lmao.ninja/v2/countries?yesterday=false&sort=cases
    const url =
      "https://corona.lmao.ninja/v2/countries?yesterday=false&sort=cases";
    const resp_countries = await Axios.get(url);
    console.log(resp_countries.data);
    const resp_countries_data = resp_countries.data;

    //Get only req fields
    var selectedType_countriesData = _.map(
      resp_countries_data,
      _.partialRight(_.pick, ["cases", "country", "continent"])
    );

    const groupedByContinent = _.groupBy(
      selectedType_countriesData,
      (d) => d.continent
    );

    console.log("GRP WORLS", groupedByContinent);

    const res = Object.keys(groupedByContinent).map((f, i) => {
      const name = f;
      const color = "hsl(" + i * 50 + ", 70%, 50%)";
      const countries_list = groupedByContinent[f];

      const children = countries_list.map((f1) => {
        const counrtyname = f1.country;
        let loc = f1["cases"];

        return { name: counrtyname, color: color, loc: loc };
      });

      return { name: name, color: color, children: children };
    });

    const world = {
      name: "world",
      color: "red",
      children: res,
    };
    setData(world);
    console.log("GRPP world", world);
  };

  const updateSelected_case = (v) => {
    console.log("health status", v);
    setSelectedtype(v);
    renderChart();
  };

  const updateSelected = async (v) => {
    setSelectedGeo(v);
    if (v === "usa") {
      getUSAdata();
    } else if (v === "world") {
      getWorldData();
    } else if (v === "india") {
      getIndiaData();
    }
  };

  const renderChart = () => {
    console.log("renderChart");
    console.log("world data", worldData);
    var selectedType_worldData = _.map(
      worldData,
      _.partialRight(_.pick, [selected_type, "country", "continent"])
    );
    const grouped = _.groupBy(selectedType_worldData, (d) => d.continent);
    console.log("renderChart", grouped, usacounties);
  };
  return (
    <>
      <Row>
        <Col span={8}>
          <Select
            value={selectedGeo}
            className="select_Settings"
            onChange={updateSelected}
          >
            {" "}
            <Option value="world">WORLD</Option>
            <Option value="india">INDIA</Option>
            <Option value="usa">USA</Option>
          </Select>
        </Col>

        {/* <Col span={8} offset={1}>
          <Select
            value={selected_type}
            className="select_Settings"
            onChange={updateSelected_case}
          >
            <Option value="select">Select</Option>
            <Option value="cases">CASES</Option>
            <Option value="active">ACTIVE</Option>
            <Option value="deaths">DEATHS</Option>
            <Option value="recovered">RECOVERED</Option>
          </Select>
        </Col> */}
      </Row>

      <div style={{ height: "300px" }}>
        {data && (
          <ResponsiveBubble
            root={data}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            identity="name"
            value="loc"
            colors={{ scheme: "nivo" }}
            padding={6}
            labelTextColor={{ from: "color", modifiers: [["darker", 0.8]] }}
            borderWidth={2}
            borderColor={{ from: "color" }}
            defs={[
              {
                id: "lines",
                type: "patternLines",
                background: "none",
                color: "inherit",
                rotation: -45,
                lineWidth: 5,
                spacing: 8,
              },
            ]}
            fill={[{ match: { depth: 1 }, id: "lines" }]}
            animate={true}
            motionStiffness={90}
            motionDamping={12}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(Bubble);
