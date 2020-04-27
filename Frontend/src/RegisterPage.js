import React, { useEffect, useContext, useState } from "react";
import { appContext } from "./Contexts/AppContext";
import Footer from "./Components/Footer/Footer";
import { withRouter } from "react-router-dom";
import Step1 from "./Components/Steps/Step1/step1";
import Step2 from "./Components/Steps/Step2/step2";
import Step3 from "./Components/Steps/Step3/step3";
import "./Components/Card.scss";
//var generateName = require("sillyname");
const RegisterPage = (props) => {
  const { appState, appDispatch } = useContext(appContext);
  useEffect(() => {
    const asyncFunction = async () => {
      // const userFromlocal = await localStorage.getItem("UserName");
      const width = window.innerWidth;

      // const g = userFromlocal === null ? "null" : userFromlocal;

      // if (g !== "null") {
      //   appDispatch({
      //     type: "LOG_IN",
      //     payload: { name: userFromlocal, width: width },
      //   });
      //   props.history.push("/plot");
      // }
      props.history.push("/plot");
      appDispatch({ type: "SET_WINDOW_WIDTH", payload: { width: width } });
    };

    asyncFunction();
  }, []);

  return (
    <div>
      <div className="card">
        {appState.step_index == 1 ? <Step1 /> : ""}
        {appState.step_index == 2 ? <Step2 /> : ""}

        {appState.step_index == 3 ? <Step3 /> : ""}
      </div>
    </div>
  );
};

export default withRouter(RegisterPage);
