import React, { useContext, useState, useEffect } from "react";
import { Row, Col, Popover, Button, Alert } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import "./nav.css";
import { appContext } from "../../Contexts/AppContext";
import { useHistory, withRouter, Link } from "react-router-dom";
import axios from "axios";

const Nav = (props) => {
  const { appState, appDispatch } = useContext(appContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInValidLogin, setIsInvalidLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const content = (
    <div>
      <p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </p>
      <p>
        <Button onClick={() => checkLogin()} type="primary">
          Login
        </Button>
      </p>
      <p>
        {" "}
        {isInValidLogin && (
          <Alert message="Invalid Credentials" type="error" showIcon />
        )}
      </p>
    </div>
  );

  const logout = async () => {
    console.log("logout");
    await localStorage.setItem("UserName", null);
    await localStorage.setItem("MongoID", null);
    appDispatch({ type: "LOG_OUT" });
    props.history.push("/");
  };

  useEffect(() => {
    console.log("object", appState.isLoggedIn);
    setIsLoggedIn(appState.isLoggedIn);
  });

  const checkLogin = async () => {
    //Greenhawk_Llama28

    const params =
      "username=" + username.trim() + "&" + "password=" + password.trim();
    const resp = await axios.get("http://localhost:8080/app/login?" + params);
    console.log("CheckLogin", resp);
    if (resp.data !== "user_not_found") {
      await localStorage.setItem("UserName", username);
      await localStorage.setItem("MongoID", resp.data);
      appDispatch({ type: "LOG_IN", payload: { name: username } });
      setUsername("");
      setPassword("");
      props.history.push("/plot");
    } else {
      setIsInvalidLogin(true);
    }
  };
  return (
    <div>
      <Row>
        <Col offset={2} span={1} style={{ marginTop: "10px" }}>
          <span className="navfont">
            {" "}
            <Link to={"/plot"}>PlotKovid</Link>
          </span>
        </Col>
        <Col
          offset={10}
          span={1}
          style={{ marginTop: "10px" }}
          className="navfont"
        >
          <span style={{ fontWeight: "bold" }}>
            {" "}
            <Link to={"/features"}>Features</Link>
          </span>
        </Col>
        <Col offset={2} style={{ marginTop: "10px" }}>
          <span>
            {isLoggedIn ? (
              <>
                {appState.name}
                {appState.isLoggedOut}
                <LogoutOutlined
                  style={{ cursor: "pointer" }}
                  onClick={() => logout()}
                ></LogoutOutlined>
              </>
            ) : (
              <>
                <Popover
                  placement="bottomRight"
                  title={"Login"}
                  content={content}
                  trigger="click"
                >
                  <div style={{ cursor: "pointer" }}>Login</div>
                </Popover>
              </>
            )}
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default withRouter(Nav);
