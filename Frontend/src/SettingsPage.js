import React, { useEffect, useContext, useState } from "react";
import {
  Row,
  Col,
  Divider,
  Select,
  DatePicker,
  message,
  Upload,
  Progress,
  Spin,
  Button,
} from "antd";
import { appContext } from "./Contexts/AppContext";
import { withRouter } from "react-router-dom";
import axios from "axios";
import {
  LoadingOutlined,
  CheckCircleTwoTone,
  LeftCircleOutlined,
} from "@ant-design/icons";
import "./Settingspage.scss";
import moment from "moment";

const { Option } = Select;
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const SettingsPage = (props) => {
  const { appState, appDispatch, searchPlaceAPI } = useContext(appContext);

  const initialstate = {
    city: "",
    country: "",
    healthstatus: "normal",

    testeddate: "1970-10-01",
    gender: "male",
    age: 0,
    typingTimer: null,
    searchPlaceresults: [],
  };
  const [state, setState] = useState(initialstate);

  const [password, setPassword] = useState("");
  const [oldpassword, setOldPassword] = useState("");

  useEffect(() => {
    console.log("state , ,", appState);

    console.log("MongoID");

    const asyncFunction = async () => {
      console.log("load only onetime --- Settings page");
      const mongoid = await localStorage.getItem("MongoID");

      const g =
        mongoid === null || mongoid === "" || mongoid === "undefined"
          ? "null"
          : mongoid;

      if (g === "null") {
        appDispatch({
          type: "LOG_OUT",
        });
        props.history.push("/");
      } else {
        const getUser_Url = "http://localhost:8080/app/getUser?id=" + g;
        let resp_getUser_Url = await axios.get(getUser_Url);
        resp_getUser_Url = resp_getUser_Url.data;
        delete resp_getUser_Url.cords;
        console.log("user", JSON.stringify(resp_getUser_Url));
        setState(resp_getUser_Url);
        console.log("State", state);
      }
    };

    asyncFunction();
  }, []);

  const searchPlaceAPIs = async () => {
    console.log(state.city);
    const place = await searchPlaceAPI(state.city);

    console.log(place);

    await setState({
      ...state,
      searchPlaceresults: place,

      showPlaceresults: "block",
    });
  };
  const keyUp = async () => {
    clearTimeout(state.typingTimer);

    setState({ ...state, typingTimer: setTimeout(searchPlaceAPIs, 3000) });
  };
  const keyDown = () => {
    clearTimeout(state.typingTimer);
  };
  const updateCity = (e) => {
    setState({ ...state, city: e.target.value });
  };

  const placeSelected = (city, country) => {
    console.log("place sel");
    setState({
      ...state,
      showPlaceresults: "none",
      city: city.trim(),
      country: country.trim(),
    });

    //this.props.setCityState(city, country);
    //this.props.updateAgeGenderPositivedate(age, gender, positiveDate);
  };

  const onchangeHealthStatus = (v) => {
    console.log("health status", v);
    setState({ ...state, healthstatus: v });
  };
  const ageUpdate = (e) => {
    setState({ ...state, age: e.target.value });
  };
  const addGender = (gender) => {
    console.log("gender", gender);
    setState({ ...state, gender: gender });
  };
  const updateProfile = async () => {
    console.log("update profile", state);
    const resp = await axios.post(
      "http://localhost:8080/app/updateProfile",
      state
    );
    console.log(resp);
    const { data } = resp;
    if (data === 201) message.error("User not found!");
    else message.success("Profile  updated");
  };

  const updatePassword = async () => {
    const params =
      "id=" +
      state._id +
      "&oldPassword=" +
      oldpassword +
      "&newPassword=" +
      password;
    const resp = await axios.get(
      "http://localhost:8080/app/updatePassword?" + params
    );
    const { data } = resp;
    if (data === 201) message.error("User Not Found!");
    else if (data === 201) message.error("Password not matched!");
    else message.success("Password updated");
    console.log(resp);
  };

  const fileProps = {
    name: "file",
    action: "http://localhost:8080/app/uploadFile1",
    headers: {
      authorization: "authorization-text",
    },
  };

  const beforeUpload = (file) => {
    console.log(file.type);
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    file.type === "application/vnd.google-earth.kml+xml"
      ? setState({ ...state, isAllKML: true })
      : setState({ ...state, isAllKML: false });
    console.log(state.isAllKML);
    return file.type === "application/vnd.google-earth.kml+xml";
  };
  const handlefileonchange = async (info) => {
    setState({
      ...state,
      showFileStatus: true,
      uploadStatus: "Uploading",
    });
    console.log("===>", info);
    if (info.file.status !== "uploading") {
      console.log(" Uploading");
      console.log(info.file, info.fileList);
      setState({
        ...state,
        fileUploadStatus: "active",
        uploadStatus: "Uploading",
      });
    }
    if (info.file.status === "done") {
      setState({
        ...state,
        fileUploadStatus: "success",
        uploadStatus: "Uploaded",
      });
    } else if (info.file.status === "error") {
      console.log("------> Failed upload file");
      console.log(info.file);
      setState({
        ...state,
        fileUploadStatus: "exception",
        uploadStatus: "Upload Failed",
      });
      message.error(`${info.file.name} file upload failed.`);
      props.history.push("/plot");
    }
  };
  const analyze = async () => {
    const url = "http://localhost:8080/app/analyze?id=" + state.id;
    console.log("ANALYSE", url);
    const resp = await axios.get(url);
    if (resp.status == 200) {
      const getUser_Url = "http://localhost:8080/app/getUser?id=" + state.id;
      const resp_getUser_Url = await axios.get(getUser_Url);
      const username = resp_getUser_Url.data.username;
      console.log("Localstorage ==> UserName", username);
      await localStorage.setItem("UserName", username);
      await localStorage.setItem("MongoID", appState.registration.mongoId);

      await appDispatch({ type: "LOG_IN", payload: { name: username } });

      console.log("moving to plot");
      props.history.push("/plot");
    }
  };
  return (
    <div>
      <Row>
        <Col span={6}> </Col>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Divider style={{ backgroundColor: "#f5e2e2" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "rgba(175, 58, 58, 0.85)",
                  }}
                >
                  Change Password
                </span>
              </Divider>
            </Col>
            <Col span={6} offset={1}>
              <input
                type="password"
                className="inp_Settings"
                value={oldpassword}
                placeholder="Old Password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Col>
            <Col span={6} offset={1}>
              <input
                className="inp_Settings"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="New Password"
              />
            </Col>

            <Col span={6} offset={1}>
              <button className="btn_settings" onClick={() => updatePassword()}>
                Update Password
              </button>
            </Col>

            <Col span={24}>
              <Divider style={{ backgroundColor: "#aff1e2bd" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#36675e",
                  }}
                >
                  Change Profile
                </span>
              </Divider>
            </Col>

            <Col span={8} className="labels">
              City
            </Col>
            <Col span={16}>
              {" "}
              <input
                type="text"
                onKeyUp={() => keyUp()}
                onKeyDown={() => keyDown()}
                className="inp_Settings"
                value={state.city}
                onChange={(e) => updateCity(e)}
              />
              <ul
                className="search-list_Settings"
                style={{ display: state.showPlaceresults }}
              >
                {state.searchPlaceresults &&
                  state.searchPlaceresults.map((f, i) => {
                    return (
                      <li
                        className={i % 2 === 0 ? "row-odd" : ""}
                        key={i}
                        onClick={() => placeSelected(f[0], f[2])}
                      >
                        <span>{f[0] + " ," + f[2]}</span>
                      </li>
                    );
                  })}
              </ul>
            </Col>
            <Col span={24} style={{ display: "block", height: "15px" }}></Col>
            <Col span={8} className="labels">
              Country
            </Col>
            <Col span={16}>
              {" "}
              <input
                className="inp_Settings"
                value={state.country}
                contentEditable={false}
              />
            </Col>
            <Col span={24} style={{ display: "block", height: "15px" }}></Col>
            <Col span={8} className="labels">
              Health Status
            </Col>
            <Col span={16}>
              <Select
                value={state.healthstatus}
                className="select_Settings"
                onChange={onchangeHealthStatus}
              >
                <Option value="victim">Victim</Option>
                <Option value="symptoms">Symptoms</Option>
                <Option value="normal">Normal</Option>
              </Select>
            </Col>
            <Col span={24} style={{ display: "block", height: "15px" }}></Col>
            <Col span={8} className="labels">
              Tested +ve Date
            </Col>
            <Col span={16}>
              {" "}
              <DatePicker
                className="select_Settings"
                value={moment(state.testeddate)}
              />
            </Col>
            <Col span={24} style={{ display: "block", height: "15px" }}></Col>
            <Col span={8} className="labels">
              Age
            </Col>
            <Col span={16}>
              {" "}
              <input
                className="inp_Settings"
                value={state.age}
                onChange={(e) => ageUpdate(e)}
              />
            </Col>
            <Col span={24} style={{ display: "block", height: "15px" }}></Col>
            <Col span={8} className="labels">
              Gender
            </Col>
            <Col span={16}>
              <Select
                value={state.gender}
                className="select_Settings"
                onChange={addGender}
              >
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Col>
            <Col span={24} style={{ display: "block", height: "15px" }}></Col>
            <Col span={24} className="flex">
              <button className="btn_settings" onClick={() => updateProfile()}>
                Update Profile
              </button>
            </Col>

            <Col span={24}>
              <Divider style={{ backgroundColor: "#62ff324f" }}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "#36675e",
                  }}
                >
                  Upload New KML Files
                </span>
              </Divider>

              <div>
                <Divider dashed />
                <Row>
                  <Col sm={{ offset: 8 }}>
                    {" "}
                    <Upload
                      data={{ id: state._id }}
                      {...fileProps}
                      accept="application/vnd.google-earth.kml+xml"
                      showUploadList={false}
                      multiple={true}
                      beforeUpload={beforeUpload}
                      onChange={async (info) => handlefileonchange(info)}
                      // style={{
                      //   marginLeft: "35%"
                      // }}
                    >
                      <Button>Click to Upload KML Files</Button>
                    </Upload>
                  </Col>
                </Row>
                <Divider dashed />
                {state.showFileStatus ? (
                  <>
                    <Row>
                      <Col xs={{ span: 24 }} sm={{ span: 4, offset: 6 }}>
                        <span style={{ fontSize: "1.5rem" }}>
                          {state.uploadStatus}
                        </span>
                      </Col>
                      <Col xs={{ span: 20 }} sm={{ span: 8, offset: 2 }}>
                        <Progress
                          percent={100}
                          size="small"
                          status={state.fileUploadStatus}
                          showInfo={false}
                        />
                      </Col>
                      <Col style={{ padding: "5px" }}>
                        {state.fileUploadStatus == "active" ? (
                          <Spin indicator={antIcon} />
                        ) : (
                          ""
                        )}

                        {state.fileUploadStatus == "success" ? (
                          <CheckCircleTwoTone twoToneColor="#52c41a" />
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>
                    {state.fileUploadStatus == "success" ? (
                      <Row>
                        <Col xs={{ span: 24 }} sm={{ span: 4, offset: 8 }}>
                          {/* <Button type="link">Go To App</Button> */}
                          <button className="gtn" onClick={() => analyze()}>
                            <span className="gtn__content">
                              Analyze My Location Data
                            </span>
                            <span className="gtn__glitch"></span>
                          </button>
                        </Col>
                      </Row>
                    ) : (
                      ""
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={6}></Col>
      </Row>
      <Divider dashed />
    </div>
  );
};

export default withRouter(SettingsPage);
