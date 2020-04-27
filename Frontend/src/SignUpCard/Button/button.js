import React, { Component } from "react";
import "./btn.scss";
import { Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
export default class button extends Component {
  render() {
    return (
      //   <div className={"btn"} style={{ backgroundColor: this.props.bgcolor }}>
      //     <span>{this.props.name}</span>
      //   </div>
      <Button className={"btn"} style={{ backgroundColor: this.props.bgcolor }}>
        <span>{this.props.name}</span>
      </Button>
    );
  }
}
