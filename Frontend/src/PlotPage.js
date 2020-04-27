import React, { Component, useState, useContext, useEffect } from "react";

import {
  Row,
  Col,
  Divider,
  Modal,
  Select,
  Badge,
  Alert,
  Result,
  Tag,
} from "antd";
import Usercard from "./Components/Plot/PlotUsercard";
import Plotmap from "./Components/Plot/plotmap";
import { RightSquareTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import { appContext } from "./Contexts/AppContext";
import { withRouter } from "react-router-dom";
import "./Components/Plot/plot.scss";
import axios from "axios";
import UserCardList from "./Components/UserCardList/UserCardList";

import * as fake from "./FakeResponce/Plotpage";

const { Option } = Select;

const PlotPage = (props) => {
  const [visible, setVisible] = useState(false);
  const { appState, appDispatch, autoCompletePlace, getVictims } = useContext(
    appContext
  );
  const [searchPlaceresults, setSearchPlaceresults] = useState([]);
  const [showPlaceresults, setShowPlaceresults] = useState("none");
  const [typingTimer, setTypingTimer] = useState(null);
  const [place, setPlace] = useState("");
  const [isNoRecordsFound, setIsNoRecordsFound] = useState(false);
  const [sortBy, setSortBy] = useState("travelDistance");
  const [page, setPage] = useState(0);
  const [top3Citys, setTopCities] = useState([]);

  useEffect(() => {
    const asyncFunction = async () => {
      setTopCities(fake.top3);
    };

    asyncFunction();
  }, []);

  const getPlaces = async () => {
    console.log(place);
    const resp_place = await autoCompletePlace(place);

    console.log(resp_place);

    if (resp_place.data.length > 0) {
      setSearchPlaceresults(resp_place.data);
      setShowPlaceresults("block");
      console.log("searchplaceres", searchPlaceresults);
    } else {
      setIsNoRecordsFound(true);
      setSearchPlaceresults([]);
      setShowPlaceresults("none");
    }
  };
  const keyUp = async () => {
    clearTimeout(typingTimer);
    setTypingTimer(setTimeout(getPlaces, 1000));
  };
  const keyDown = () => {
    clearTimeout(typingTimer);
  };

  const handleOk = (e) => {
    appDispatch({
      type: "TOGGLE_MODAL_PLOT_MAP",
      payload: { visible: false },
    });
  };

  const handleCancel = (e) => {
    appDispatch({
      type: "TOGGLE_MODAL_PLOT_MAP",
      payload: { visible: false },
    });
  };

  const updateCity = (place) => {
    setPlace(place);
    setShowPlaceresults("none");
    setSearchPlaceresults([]);
  };
  const handleChangeSortBy = (sortBy) => {
    console.log("Handel sort chagnr");
    setSortBy(sortBy);
  };
  const getVictimsList = async () => {
    setPage(0);
    const resp = await getVictims(place, sortBy, 0);

    appDispatch({ type: "VICTIMS_LIST", payload: { victims: resp.data } });
  };
  const loadMoreVictims = async () => {
    //get current page
    const nextPage = page + 1;
    console.log(nextPage);
    const resp = await getVictims(place, sortBy, nextPage);
    console.log("Load more vic", resp.data);

    appDispatch({ type: "ADD_VICTIMS_LIST", payload: { victims: resp.data } });
    setPage(page + 1);
  };
  return (
    <div>
      <>
        <div style={{ display: "block", height: "10px" }}></div>
        <Row justify="space-around">
          <Col
            sm={{ span: 6, offset: 1 }}
            xs={{ span: 24 }}
            className="column_a"
          >
            <Row>
              <Col xs={{ span: 18, offset: 1 }} sm={{ span: 14 }}>
                <input
                  placeholder="Search city or user"
                  type="text"
                  style={{ height: "7vh", width: "100%" }}
                  className="input"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  onKeyUp={() => keyUp()}
                  onKeyDown={() => keyDown()}
                />

                {isNoRecordsFound && (
                  <Alert message="Place Not Found!" type="error" closable />
                )}

                {/* <ul
                  className="search-list_Plot"
                  style={{ display: showPlaceresults }}
                > */}
                <ul
                  className="search-list_Plot"
                  style={{ display: showPlaceresults }}
                >
                  {searchPlaceresults &&
                    searchPlaceresults.map((f, i) => {
                      return (
                        <li
                          className={i % 2 === 0 ? "row-odd" : ""}
                          key={i}
                          style={{ marginBottom: "10px" }}
                          onClick={() => updateCity(f.address)}
                        >
                          {/* <span>{f[0] + " ," + f[2]}</span> */}
                          <Row
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Col span={24}>
                              {" "}
                              <span style={{ fontSize: "14px" }}>
                                {f.address}{" "}
                                <Badge
                                  count={f.cases}
                                  className="site-badge-count-4"
                                />{" "}
                              </span>
                            </Col>
                            {/* <Col span={4}>
                              {" "}
                              <Badge
                                count={f.cases}
                                className="site-badge-count-4"
                              />{" "}
                            </Col> */}
                          </Row>
                        </li>
                      );
                    })}
                </ul>
                {/* </ul> */}
              </Col>
              <Col
                xs={{ span: 4 }}
                sm={{ span: 8, offset: 1 }}
                style={{ display: "flex", alignItems: "center" }}
              >
                <button
                  disabled={place === "" ? true : false}
                  className="btn_settings"
                  onClick={() => getVictimsList()}
                >
                  Search
                </button>
              </Col>

              <Col span={24}>
                {" "}
                <div style={{ display: "block", height: "10px" }}></div>
              </Col>

              <Col
                sm={{ span: 6, offset: 1 }}
                style={{ display: "flex", alignItems: "flex-end" }}
              >
                <span>Sort By : </span>
              </Col>
              <Col sm={{ span: 16 }}>
                <Select
                  value={sortBy}
                  style={{ width: "80%" }}
                  onChange={handleChangeSortBy}
                >
                  <Option value="travelDistance">Travel Distance</Option>
                  <Option value="lockDown">Lock Down period</Option>
                  <Option value="testDate">+ve Date</Option>
                </Select>
              </Col>

              <Col span={24}>
                <div className={"tagClass"}>
                  {top3Citys &&
                    top3Citys.map((f) => (
                      <Tag color="purple" onClick={() => setPlace(f.address)}>
                        {f.address.split(",")[0]}
                      </Tag>
                    ))}
                </div>
              </Col>
            </Row>
            <Divider />
            <Row justify="space-around">
              <Col span={20} id="style-3" className="user-content">
                <UserCardList />
              </Col>
              <Col
                span={24}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <span onClick={() => loadMoreVictims()} className="loadMore">
                  {" "}
                  Load More
                </span>
              </Col>
            </Row>
          </Col>
          <Col
            sm={{ span: 16, offset: 1 }}
            xs={{ span: 24 }}
            className="column_b"
          >
            {appState.width > 800 ? (
              appState.showModal_Plot_Map ? (
                <Plotmap />
              ) : (
                <Result title="No Results Found!" />
              )
            ) : (
              <>
                <Modal
                  title="MAP [press back to exit]"
                  visible={appState.showModal_Plot_Map}
                  centered={true}
                  footer={null}
                >
                  <Plotmap />
                </Modal>
              </>
            )}
          </Col>
        </Row>
        {appState.showModal_Plot_Map && (
          <CloseCircleTwoTone
            onClick={() => handleCancel()}
            style={{ fontSize: "3rem" }}
            className="float"
          />
        )}
      </>
    </div>
  );
};

export default withRouter(PlotPage);
