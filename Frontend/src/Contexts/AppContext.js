import React, { createContext, useReducer } from "react";
import { appReducer } from "../Reducers/appReducer";
import axios from "axios";
import * as turf from "@turf/turf";

import * as fakePlotpage from "../FakeResponce/Plotpage";

export const appContext = createContext();

var moment = require("moment");
const AppContextProvider = (props) => {
  const searchPlaceAPI = async (city) => {
    const url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      encodeURI(city) +
      ".json?" +
      "access_token=pk.eyJ1Ijoid2F0Y2hkaG9nIiwiYSI6ImNrOGZ1OXM2OTAxbmszZ29mN2N0YWptbGMifQ.RCO3hogiVx-N4hHevaomYA&cachebuster=1585655756774&autocomplete=true";
    let res = await axios.get(url);
    console.log(
      "https://geocode.search.hereapi.com/v1/geocode?q=" + encodeURI(city)
    );

    console.log(res.data.features);
    res = res.data.features.map((f) => f.place_name);
    const place = res
      .map((f) => f.split(","))
      .filter((f) => f.length >= 3)
      .map((g) => [g[g.length - 3], g[g.length - 2], g[g.length - 1]]);

    return place;
  };

  const autoCompletePlace = async (place) => {
    const url =
      "http://localhost:8080/app/placeAutoComplete?placename=" + place;
    const resp = await axios.get(url);
    console.log(resp);
    return resp;
  };

  const getVictims = async (place, sortBy, page) => {
    console.log("get Vitims ");

    const resp = {};

    resp.data = fakePlotpage.victimsList;
    console.log(resp.data);
    return resp;
  };

  const renderIntersect = (f, id) => {
    console.log("reender intersect ", f, id);
    var line1 = turf.lineString([
      [f[0].lat, f[0].lng],
      [f[1].lat, f[1].lng],
    ]);
    var line2 = turf.lineString([
      [f[2].lat, f[2].lng],
      [f[3].lat, f[3].lng],
    ]);
    var intersects = turf.lineIntersect(line1, line2);
    console.log("Overlap :", intersects);

    let center = [0.0, 0.0];

    if (intersects.features.length === 0) {
      //overlap
      center = [f[0].lat, f[0].lng];
    } else {
      center = intersects.features[0].geometry.coordinates;
    }

    //const center = intersects.features[0].geometry.coordinates;
    console.log("Overlap:", center);

    let selectedUser = appState.intersect.IntersectedVictims.filter(
      (f) => f.id === id
    );

    selectedUser = Object.assign({}, ...selectedUser);
    console.log(selectedUser);
    const [usr_start_cords, usr_end_cords, vic_start_cords, vic_end_cords] = f;

    const userDuration = Math.abs(
      moment(usr_start_cords.starttime).diff(
        moment(usr_end_cords.starttime),
        "ms"
      )
    );
    const usertime = {
      st: usr_start_cords.starttime,
      et: usr_end_cords.starttime,
    };

    const victmDuration = Math.abs(
      moment(vic_start_cords.starttime).diff(
        moment(vic_end_cords.starttime),
        "ms"
      )
    );
    const victimtime = {
      st: vic_start_cords.starttime,
      et: vic_end_cords.starttime,
    };

    const map = {
      intersectionlines: {
        user_latlng: usr_start_cords,
        user_end_latlng: usr_end_cords,
        victim_latlng: vic_start_cords,
        victim_end_latlng: vic_end_cords,
      },
      selectedCords: {
        user_latlng: usr_start_cords,
        user_end_latlng: usr_end_cords,
        victim_latlng: vic_start_cords,
        victim_end_latlng: vic_end_cords,
      },
      usertime: usertime,
      victimtime: victimtime,

      user_duration: userDuration / appState.intersect.map.speedFactor,
      victim_duration: victmDuration / appState.intersect.map.speedFactor,
      isSimulated: false,
    };
    console.log("---->", map.intersectionlines);

    //selectedIntersectVictim  SELECTED_INTERSECTED_VICTIMS
    appDispatch({
      type: "SELECTED_INTERSECTED_VICTIMS",
      payload: {
        selectedIntersectVictim: selectedUser,
        center: center,
        map: map,
      },
    });
    //this.props.renderIntersect(intersectionPoint, f);
  };

  const initialState = {
    name: "",
    width: 0,
    isLoggedIn: false,
    registration: {
      username: "",
      password: "",

      city: "",
      country: "",

      healthstatus: "",
      testeddate: "",
      age: "",
      gender: "",
    },
    step_index: 1,
    showModal_Plot_Map: false,
    victimsList: [],
    selectedVictim: {},
    intersect: {
      IntersectedVictims: [],
      selectedIntersectVictim: {},

      showMap: false,
      center: [],
      map: {
        usertime: {},
        victimtime: {},
        intersectionlines: {
          user_latlng: { lat: 0.0, lng: 0.0, starttime: "", endtime: "" },
          user_end_latlng: { lat: 0.0, lng: 0.0, starttime: "", endtime: "" },
          victim_latlng: { lat: 0.0, lng: 0.0, starttime: "", endtime: "" },
          victim_end_latlng: { lat: 0.0, lng: 0.0, starttime: "", endtime: "" },
        },
        selectedCords: {
          user_latlng: { lat: 0.0, lng: 0.0, starttime: "", endtime: "" },
          user_end_latlng: { lat: 0.0, lng: 0.0, starttime: "", endtime: "" },
          victim_latlng: { lat: 0.0, lng: 0.0, starttime: "", endtime: "" },
          victim_end_latlng: { lat: 0.0, lng: 0.0, starttime: "", endtime: "" },
        },
        user_duration: 1,
        victim_duration: 1,
        speedFactor: 1,
        Timerange: [],
        isSimulated: false,
        clockTimer: "",
      },
    },
  };
  const [appState, appDispatch] = useReducer(appReducer, initialState);

  return (
    <div>
      <appContext.Provider
        value={{
          appState,
          appDispatch,
          searchPlaceAPI,
          autoCompletePlace,
          getVictims,
          renderIntersect,
        }}
      >
        {props.children}
      </appContext.Provider>
    </div>
  );
};

export default AppContextProvider;
