import React, { useContext, useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter,
  useHistory,
} from "react-router-dom";
import Plot from "./Modules/Plot/plot";
import Intersect from "./Modules/Intersect/intersect";
import Section from "./Components/Section";
import RegisterPage from "./RegisterPage";
import { appContext } from "./Contexts/AppContext";
import Nav from "./Components/Nav/Nav";
import PlotPage from "./PlotPage";
import Footer from "./Components/Footer/Footer";
import IntersectPage from "./IntersectPage";
import SettingsPage from "./SettingsPage";
import { Divider } from "antd";
import axios from "axios";
import StatsPage from "./StatsPage";
import * as fakeResponseIntersection from "./FakeResponce/IntersectPage";
import FeaturePage from "./FeaturePage";

const App = (props) => {
  const { appDispatch } = useContext(appContext);

  useEffect(() => {
    console.log("Alreaft");
    const asyncFunc = async () => {
      //IntersectedVictims INTERSECTED_USERS
      appDispatch({
        type: "INTERSECTED_VICTIMS",
        payload: { IntersectedVictims: fakeResponseIntersection.Intersections },
      });
    };

    asyncFunc();
  }, []);

  useEffect(() => {
    console.log("APP CAlled");
    const asyncFun = async () => {
      appDispatch({
        type: "LOG_IN",
        payload: { name: "AmazingSpiderMan" },
      });
    };
    asyncFun();

    appDispatch({
      type: "SET_WINDOW_WIDTH",
      payload: { width: window.innerWidth },
    });
  }, []);
  return (
    <div>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/">
            <RegisterPage />
          </Route>

          <Route exact path="/plot">
            <Section />
            <PlotPage />
          </Route>

          <Route exact path="/intersect">
            <Section />
            <IntersectPage />
          </Route>

          <Route exact path="/settings">
            <Section />
            <SettingsPage />
          </Route>
          <Route exact path="/stats">
            <Section />
            <StatsPage />
          </Route>

          <Route exact path="/features">
            <Section />
            <FeaturePage />
          </Route>
        </Switch>
      </Router>
      <Divider />
      {/* <Footer /> */}
    </div>
  );
};

export default withRouter(App);
