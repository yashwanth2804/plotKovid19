import React, { Component } from "react";
import "./step2.scss";
import { AutoComplete, Divider } from "antd";
import { Spin, DatePicker, Row, Col, Select } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { LeftCircleOutlined } from "@ant-design/icons";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Option } = Select;

export default class step2 extends Component {
  state = {
    editCity: false,
    editDate: false,
    showPlaceresults: "none",
    searchPlaceresults: [],
    city: "",
    country: "",
    age: 0,
    gender: "Male",
    positiveDate: "",
    typingTimer: null,
    loadSpinner: false
  };

  placeSelected = (city, country) => {
    console.log("place sel");
    this.setState({
      showPlaceresults: "none",
      city: city.trim(),
      country: country.trim()
    });

    //this.props.setCityState(city, country);
    //this.props.updateAgeGenderPositivedate(age, gender, positiveDate);
  };
  updateCity = e => {
    this.setState({ city: e.target.value });
  };
  keyUp = () => {
    this.setState({ loadSpinner: true });
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(this.doneTyping, 1000);
  };
  keyDown = () => {
    clearTimeout(this.typingTimer);
  };
  doneTyping = async () => {
    console.log(this.state.city);
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURI(this.state.city) +
      ".json?" +
      "access_token=pk.eyJ1Ijoid2F0Y2hkaG9nIiwiYSI6ImNrOGZ1OXM2OTAxbmszZ29mN2N0YWptbGMifQ.RCO3hogiVx-N4hHevaomYA&cachebuster=1585655756774&autocomplete=true";
    let res = await axios.get(url);
    console.log(
      "https://geocode.search.hereapi.com/v1/geocode?q=" +
        encodeURI(this.state.city)
    );
    //console.log(JSON.stringify(res.data.items));
    console.log(res.data.features);
    res = res.data.features.map(f => f.place_name);
    const place = res
      .map(f => f.split(","))
      .filter(f => f.length >= 3)
      .map(g => [g[g.length - 3], g[g.length - 2], g[g.length - 1]]);

    console.log(res);

    await this.setState({ searchPlaceresults: place });
    this.setState({ loadSpinner: false, showPlaceresults: "block" });
  };

  onChangeDate = (d, ds) => {
    console.log(d, ds);
    this.setState({ positiveDate: ds });
  };
  addGender = g => {
    this.setState({ gender: g }, () => console.log(this.state));
  };
  addAge = a => {
    this.setState({ age: a });
  };
  render() {
    return (
      <>
        <div className={"card-title"}>My Details</div>

        <div className={"step2-body"}>
          <span>I live in </span>
          {this.state.editCity ? (
            <span>
              <input
                onKeyUp={() => this.keyUp()}
                onKeyDown={() => this.keyDown()}
                type="text"
                onChange={e => this.updateCity(e)}
                value={this.state.city}
                style={{ width: "260px" }}
                className="input"
              />
              {this.state.loadSpinner ? <Spin indicator={antIcon} /> : ""}
              <ul
                className="search-list"
                style={{ display: this.state.showPlaceresults }}
              >
                {this.state.searchPlaceresults.map((f, i) => {
                  return (
                    <li
                      className={i % 2 === 0 ? "row-odd" : ""}
                      key={i}
                      onClick={() => this.placeSelected(f[0], f[2])}
                    >
                      <span>{f[0] + " ," + f[2]}</span>
                    </li>
                  );
                })}
              </ul>
            </span>
          ) : (
            <u onClick={() => this.setState({ editCity: true })}>
              City/Country,
            </u>
          )}
          <span> Tested </span>
          <span style={{ color: "red" }}>+ve</span> on&nbsp;
          {!this.state.editDate ? (
            <u onClick={() => this.setState({ editDate: true })}>Date</u>
          ) : (
            <DatePicker onChange={this.onChangeDate} />
          )}
          <Divider dashed>Scroll to add bio</Divider>
          <Row>
            <Col className="key" xs={{ span: 24 }} sm={{ span: 12 }}>
              UserName{" "}
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              style={{ fontSize: "1.5rem" }}
            >
              {this.props.name}
            </Col>
          </Row>
          <Row>
            <Col className="key" xs={{ span: 24 }}>
              Age{" "}
            </Col>
            <Col xs={{ span: 24 }}>
              <input
                type="text"
                style={{ width: "40vh" }}
                maxLength={"2"}
                className="input"
                onChange={e => this.addAge(e.target.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col className="key" xs={{ span: 24 }}>
              Gender{" "}
            </Col>
            <Col xs={{ span: 24 }}>
              {" "}
              <Select
                defaultValue="male"
                style={{ width: "40vh", fontSize: "1rem" }}
                onChange={this.addGender}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Col>
          </Row>
        </div>

        <Row style={{ float: "right" }}>
          <Col span={12}>
            {" "}
            <LeftCircleOutlined
              className={"btn"}
              onClick={() => this.props.decreaseIndex()}
              style={{ fontSize: "2rem" }}
            />
          </Col>
          <Col span={12}>
            {" "}
            <button
              style={{ backgroundColor: "#FBFF4E" }}
              className={"btn"}
              onClick={() => this.props.step2updateIndex(this.state)}
            >
              NEXT
            </button>
          </Col>
        </Row>
      </>
    );
  }
}
