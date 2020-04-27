import React, { useState, useEffect } from "react";
import "./table.scss";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import Axios from "axios";
import _ from "lodash";
import * as fakeResponceStats from "../../FakeResponce/StatsPage";
const Table = () => {
  const [type, setType] = useState("localdown_hr");
  const [data, setData] = useState([]);
  const [gh, sgh] = useState(null);
  useEffect(() => {
    const asyncFun = async () => {
      //localdown_hr travel_dst travel_hr positive_dt

      const data = fakeResponceStats.TableData;

      var reqFields = _.map(
        data,
        _.partialRight(_.pick, [
          "username",
          "travelhours",
          "traveldistance",
          "lockdownhours",
          "testeddate",
        ])
      );

      setData(reqFields);
    };

    asyncFun();
  }, []);

  const selectedeSort = (v) => {
    setType(v);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Name</th>

            <th>Travel Time</th>
            <th>Travel Dst</th>
            <th>Lockdown</th>
            <th>+ve Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((f) => (
            <tr>
              <td>{f.username}</td>
              <td>{f.travelhours}</td>

              <td>{f.traveldistance}</td>
              <td>{f.lockdownhours}</td>

              <td>{f.testeddate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
