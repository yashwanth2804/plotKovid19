import React from "react";
import { Row, Col, Divider } from "antd";
import logo from "./SVG/Features/c1.gif";
import c2 from "./SVG/Features/c2.gif";
import plot from "./SVG/Features/Plot.png";
import speed from "./SVG/Features/Speed.png";
import stats from "./SVG/Features/Stats.png";
import stats2 from "./SVG/Features/Stats2.png";
import "./Features.scss";
const FeaturePage = () => {
  return (
    <div>
      <Row>
        <Col span={12} offset={4}>
          <h2>
            <b>Features</b>
          </h2>
          <Divider />
          <Col span={24}>
            {" "}
            <h3>
              <b>1.Plot</b>
            </h3>{" "}
            <p>
              This page gives the covid-19 cases information about the searched
              place.This results the list of victims who falls in that place and
              their movement history.Users can see the plotted graph from the
              victim's google timeline data.{" "}
            </p>{" "}
            <img width={"900"} src={plot} alt="loading..." />
          </Col>
          <Divider />
          <Col span={24}>
            <h3>
              <b>2.Intersect</b>
            </h3>{" "}
            <p>
              This page gives the information whether the current(logged in)
              user have met with covid-19 victims/symptoms.This can be achieved
              by comparing users 'Google Timeline' data against the victim's
              timeline data, considering the both are only hours apart (time is
              taken into consideration). This will also provides information
              even if user have multiple interactions with single victim.
            </p>{" "}
            <img width={"900"} src={logo} alt="loading..." />
            <p>
              There is a speed factor,which will simulate the points faster by
              speeding up the time{" "}
            </p>
            <img width={"900"} src={speed} alt="loading..." />
            <p></p>
            <img width={"900"} src={c2} alt="loading..." />
          </Col>
          <Divider />
          <Col span={24}>
            <h3>
              <b>3.Stats</b>
            </h3>{" "}
            <p>
              This page gives the information regarding covid-19 from different
              sources and from the app itself, a 'Dashboard'.(still more to add)
            </p>{" "}
            <img width={"900"} src={stats} alt="loading..." />
            <img width={"400"} src={stats2} alt="loading..." />
          </Col>
          <Divider />
          <h2>
            <b>F.A.Q</b>
          </h2>
          <Divider />
          <div class="faq">
            <div class="faq-q">
              <span>
                <b>How can this site have users location data ?</b>
              </span>
              <p>
                Every location data in site are willing uploaded by users. No
                location data is being uploaded to site until or unless getting
                acceptance from user.
              </p>
            </div>
            <div class="faq-q">
              <span>
                <b>Can I see all users location data?</b>
              </span>
              <p>
                No , only you can see the location data of users who are listed
                under victims/symptoms category.
              </p>
            </div>
            <div class="faq-q">
              <span>
                <b>Do I need to give my actual name ?</b>
              </span>
              <p>
                No , username will be randomly chosen from the site while
                registering. you may need to note it for subsequent logins.
              </p>
            </div>

            <div class="faq-q">
              <span>
                <b>Can I delete my data?</b>
              </span>
              <p>Yes</p>
            </div>

            <div class="faq-q">
              <span>
                <b>How can I know data uploaded by victim is valid ?</b>
              </span>
              <p>
                We have 'Peer reviewed' option , using this users in location
                living nearby victims can report whether it's valid or invalid
                one. (under development)
              </p>
            </div>

            <div class="faq-q">
              <span>
                <b>How can I upload my location data ?</b>
              </span>
              <p>
                Go to{" "}
                <a href="https://www.google.com/maps/timeline" target="_blank">
                  https://www.google.com/maps/timeline
                </a>{" "}
                and select individual dates (upto min 2 weeks).After selecting
                click 'Gear Icon' , then you find a option 'Export this day to
                KML'.By clicking this , will download a KML(file format) file.
                Once all the individual files downloaded , upload all the KML
                files during signup process.
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FeaturePage;
