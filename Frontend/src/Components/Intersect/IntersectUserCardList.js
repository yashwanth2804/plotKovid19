import React, { useContext } from "react";
import { appContext } from "../../Contexts/AppContext";
import IntersectUsercard from "./IntersectUsercard";

const IntersectUserCardList = () => {
  const { appState, appDispatch } = useContext(appContext);
  const yy = appState.intersect.IntersectedVictims.map((f, i) => (
    <IntersectUsercard {...f} key={i} />
  ));

  return <div>{yy}</div>;
};

export default IntersectUserCardList;
