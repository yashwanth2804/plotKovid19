import React, { Component } from "react";
import { Radio, Input, Row, Col } from "antd";
import { LeftCircleOutlined } from "@ant-design/icons";
export default class step1 extends Component {
  state = {
    value: "normal"
  };

  onChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      value: e.target.value
    });
  };
  render() {
    const radioStyle = {
      display: "block",
      height: "45px",
      fontSize: "1.5rem",
      lineHeight: "40px",
      marginLeft: "45px",
      marginTop: "10px"
    };

    return (
      <>
        <>
          <div>
            <div className={"card-title"}> I have ...</div>
            <Radio.Group onChange={this.onChange} value={this.state.value}>
              <Radio style={radioStyle} value={"victim"}>
                Corono Virus
              </Radio>
              <Radio style={radioStyle} value={"symptoms"}>
                Symptoms
              </Radio>
              <Radio style={radioStyle} value={"normal"}>
                Normal Health
              </Radio>
            </Radio.Group>
          </div>
          <Row style={{ float: "right" }}>
            <Col>
              {" "}
              <button
                style={{ backgroundColor: "#FBFF4E" }}
                className={"btn"}
                onClick={() => this.props.step1updateIndex(this.state)}
              >
                NEXT
              </button>
            </Col>
          </Row>
        </>
      </>
    );
  }
}
