import React, { useContext, Component, useState, useEffect } from "react";
import "./step2.scss";
import { AutoComplete, Divider } from "antd";
import { Spin, DatePicker, Row, Col, Select, Tooltip } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { LeftCircleOutlined } from "@ant-design/icons";
import { appContext } from "../../../Contexts/AppContext";
import Dice from "../../../SVG/Dice";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const { Option } = Select;

var generateName = require("sillyname");

const Step2 = () => {
  const { appState, appDispatch, searchPlaceAPI } = useContext(appContext);
  const stateObj = {
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
    loadSpinner: false,
    name: "",
    password: "",
    disabled: true,
  };
  const [state, setState] = useState(stateObj);
  const keyUp = () => {
    setState({ ...state, loadSpinner: true });
    clearTimeout(state.typingTimer);

    setState({ ...state, typingTimer: setTimeout(searchPlaceAPIs, 1000) });
  };
  const keyDown = () => {
    clearTimeout(state.typingTimer);
  };

  const searchPlaceAPIs = async () => {
    console.log(state.city);
    const place = await searchPlaceAPI(state.city);

    console.log(place);

    await setState({
      ...state,
      searchPlaceresults: place,
      loadSpinner: false,
      showPlaceresults: "block",
    });
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

  const onChangeDate = (d, ds) => {
    console.log(d, ds);
    setState({ ...state, positiveDate: ds });
  };
  const addGender = (g) => {
    setState({ ...state, gender: g }, () => console.log(state));
  };
  const addAge = (a) => {
    setState({ ...state, age: a });
  };

  const GenerateRandomName = () => {
    const name =
      generateName().replace(" ", "_") +
      Math.floor(Math.random() * (99 - 10 + 1) + 10);
    setState({ ...state, name: name });
  };

  const register = async () => {
    const user = {
      username: state.name,
      password: state.password,

      city: state.city,
      country: state.country,

      testeddate: state.positiveDate,

      age: state.age,
      gender: state.gender,
      healthstatus: appState.registration.healthstatus,
    };

    console.log("CLG", user, appState);
    const resp = await axios.post("http://localhost:8080/app/signup", user);
    console.log(resp.data);

    await appDispatch({
      type: "REGISTRATION",
      payload: {
        username: state.name,
        password: state.password,

        city: state.city,
        country: state.country,

        testeddate: state.positiveDate,

        age: state.age,
        gender: state.gender,
        mongoId: resp.data,
      },
    });
    await appDispatch({ type: "INC_INDEX" });
  };
  const victimUser_Button_Props = () => {
    return state.city === "" ||
      state.positiveDate === "" ||
      state.name === "" ||
      state.password === "" ||
      state.age === 0 ||
      state.gender === ""
      ? "disabled"
      : "";
  };
  const User_Button_Props = () => {
    return state.city === "" ||
      state.name === "" ||
      state.password === "" ||
      state.age === 0 ||
      state.gender === ""
      ? "disabled"
      : "";
  };

  return (
    <div>
      <>
        <div className={"card-title"}>My Details</div>

        <div className={"step2-body"}>
          <span>I live in </span>
          {state.editCity ? (
            <span>
              <input
                onKeyUp={() => keyUp()}
                onKeyDown={() => keyDown()}
                type="text"
                onChange={(e) => updateCity(e)}
                value={state.city}
                style={{ width: "260px" }}
                className="input"
              />
              {state.loadSpinner ? <Spin indicator={antIcon} /> : ""}
              <ul
                className="search-list"
                style={{ display: state.showPlaceresults }}
              >
                {state.searchPlaceresults.map((f, i) => {
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
            </span>
          ) : (
            <u onClick={() => setState({ ...state, editCity: true })}>
              City/Country,
            </u>
          )}
          {appState.registration.healthstatus === "normal" && ""}
          {appState.registration.healthstatus === "symptoms" && (
            <>
              <span> Showing symptoms from date </span>

              {!state.editDate ? (
                <u onClick={() => setState({ ...state, editDate: true })}>
                  Date
                </u>
              ) : (
                <DatePicker onChange={onChangeDate} />
              )}
            </>
          )}
          {appState.registration.healthstatus === "victim" && (
            <>
              <span> Tested </span>
              <span style={{ color: "red" }}>+ve</span> on&nbsp;
              {!state.editDate ? (
                <u onClick={() => setState({ ...state, editDate: true })}>
                  Date
                </u>
              ) : (
                <DatePicker onChange={onChangeDate} />
              )}
            </>
          )}
          <Divider dashed>Scroll to add bio</Divider>
          <Row>
            <Col className="key" xs={{ span: 24 }} sm={{ span: 3 }}>
              UserName{" "}
            </Col>
            <Col sm={{ span: 2 }}>
              <Tooltip title="Generate Random name">
                <span
                  onClick={() => GenerateRandomName()}
                  style={{ cursor: "pointer" }}
                >
                  {" "}
                  <Dice />
                </span>
              </Tooltip>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 10 }}
              style={{ fontSize: "24px" }}
            >
              {state.name === "" ? "Click On Dice!" : state.name}
            </Col>
            <Col sm={{ span: 8 }}>
              <input
                type="password"
                placeholder="Password"
                style={{ fontSize: "24px" }}
                value={state.password}
                onChange={(e) =>
                  setState({ ...state, password: e.target.value })
                }
              />
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
                onChange={(e) => addAge(e.target.value)}
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
                onChange={addGender}
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
              onClick={() => appDispatch({ type: "DEC_INDEX" })}
              style={{ fontSize: "2rem" }}
            />
          </Col>
          <Col span={12}>
            {" "}
            <button
              style={{ backgroundColor: "#FBFF4E" }}
              className={"btn"}
              //onClick={() => props.step2updateIndex(state)}
              onClick={() => register()}
              disabled={
                appState.registration.healthstatus === "victim"
                  ? victimUser_Button_Props()
                  : User_Button_Props()
              }
            >
              NEXT
            </button>
          </Col>
        </Row>
      </>
    </div>
  );
};

export default Step2;

// class step2 extends Component {
//   state = {
//     editCity: false,
//     editDate: false,
//     showPlaceresults: "none",
//     searchPlaceresults: [],
//     city: "",
//     country: "",
//     age: 0,
//     gender: "Male",
//     positiveDate: "",
//     typingTimer: null,
//     loadSpinner: false,
//   };

//   placeSelected = (city, country) => {
//     console.log("place sel");
//     this.setState({
//       showPlaceresults: "none",
//       city: city.trim(),
//       country: country.trim(),
//     });

//     //this.props.setCityState(city, country);
//     //this.props.updateAgeGenderPositivedate(age, gender, positiveDate);
//   };
//   updateCity = (e) => {
//     this.setState({ city: e.target.value });
//   };
//   keyUp = () => {
//     this.setState({ loadSpinner: true });
//     clearTimeout(this.typingTimer);
//     this.typingTimer = setTimeout(this.doneTyping, 1000);
//   };
//   keyDown = () => {
//     clearTimeout(this.typingTimer);
//   };
//   doneTyping = async () => {
//     console.log(this.state.city);
//     const url =
//       "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
//       encodeURI(this.state.city) +
//       ".json?" +
//       "access_token=pk.eyJ1Ijoid2F0Y2hkaG9nIiwiYSI6ImNrOGZ1OXM2OTAxbmszZ29mN2N0YWptbGMifQ.RCO3hogiVx-N4hHevaomYA&cachebuster=1585655756774&autocomplete=true";
//     let res = await axios.get(url);
//     console.log(
//       "https://geocode.search.hereapi.com/v1/geocode?q=" +
//         encodeURI(this.state.city)
//     );
//     //console.log(JSON.stringify(res.data.items));
//     console.log(res.data.features);
//     res = res.data.features.map((f) => f.place_name);
//     const place = res
//       .map((f) => f.split(","))
//       .filter((f) => f.length >= 3)
//       .map((g) => [g[g.length - 3], g[g.length - 2], g[g.length - 1]]);

//     console.log(res);

//     await this.setState({ searchPlaceresults: place });
//     this.setState({ loadSpinner: false, showPlaceresults: "block" });
//   };

//   onChangeDate = (d, ds) => {
//     console.log(d, ds);
//     this.setState({ positiveDate: ds });
//   };
//   addGender = (g) => {
//     this.setState({ gender: g }, () => console.log(this.state));
//   };
//   addAge = (a) => {
//     this.setState({ age: a });
//   };
//   render() {
//     return (
//       <>
//         <div className={"card-title"}>My Details</div>

//         <div className={"step2-body"}>
//           <span>I live in </span>
//           {this.state.editCity ? (
//             <span>
//               <input
//                 onKeyUp={() => this.keyUp()}
//                 onKeyDown={() => this.keyDown()}
//                 type="text"
//                 onChange={(e) => this.updateCity(e)}
//                 value={this.state.city}
//                 style={{ width: "260px" }}
//                 className="input"
//               />
//               {this.state.loadSpinner ? <Spin indicator={antIcon} /> : ""}
//               <ul
//                 className="search-list"
//                 style={{ display: this.state.showPlaceresults }}
//               >
//                 {this.state.searchPlaceresults.map((f, i) => {
//                   return (
//                     <li
//                       className={i % 2 === 0 ? "row-odd" : ""}
//                       key={i}
//                       onClick={() => this.placeSelected(f[0], f[2])}
//                     >
//                       <span>{f[0] + " ," + f[2]}</span>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </span>
//           ) : (
//             <u onClick={() => this.setState({ editCity: true })}>
//               City/Country,
//             </u>
//           )}
//           <span> Tested </span>
//           <span style={{ color: "red" }}>+ve</span> on&nbsp;
//           {!this.state.editDate ? (
//             <u onClick={() => this.setState({ editDate: true })}>Date</u>
//           ) : (
//             <DatePicker onChange={this.onChangeDate} />
//           )}
//           <Divider dashed>Scroll to add bio</Divider>
//           <Row>
//             <Col className="key" xs={{ span: 24 }} sm={{ span: 12 }}>
//               UserName{" "}
//             </Col>
//             <Col
//               xs={{ span: 24 }}
//               sm={{ span: 12 }}
//               style={{ fontSize: "1.5rem" }}
//             >
//               {this.props.name}
//             </Col>
//           </Row>
//           <Row>
//             <Col className="key" xs={{ span: 24 }}>
//               Age{" "}
//             </Col>
//             <Col xs={{ span: 24 }}>
//               <input
//                 type="text"
//                 style={{ width: "40vh" }}
//                 maxLength={"2"}
//                 className="input"
//                 onChange={(e) => this.addAge(e.target.value)}
//               />
//             </Col>
//           </Row>
//           <Row>
//             <Col className="key" xs={{ span: 24 }}>
//               Gender{" "}
//             </Col>
//             <Col xs={{ span: 24 }}>
//               {" "}
//               <Select
//                 defaultValue="male"
//                 style={{ width: "40vh", fontSize: "1rem" }}
//                 onChange={this.addGender}
//               >
//                 <Option value="male">Male</Option>
//                 <Option value="female">Female</Option>
//                 <Option value="other">Other</Option>
//               </Select>
//             </Col>
//           </Row>
//         </div>

//         <Row style={{ float: "right" }}>
//           <Col span={12}>
//             {" "}
//             <LeftCircleOutlined
//               className={"btn"}
//               onClick={() => this.props.decreaseIndex()}
//               style={{ fontSize: "2rem" }}
//             />
//           </Col>
//           <Col span={12}>
//             {" "}
//             <button
//               style={{ backgroundColor: "#FBFF4E" }}
//               className={"btn"}
//               onClick={() => this.props.step2updateIndex(this.state)}
//             >
//               NEXT
//             </button>
//           </Col>
//         </Row>
//       </>
//     );
//   }
// }
