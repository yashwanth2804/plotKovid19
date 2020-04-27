import React, { useContext } from "react";
import { appContext } from "../../Contexts/AppContext";
import PlotUsercard from "../Plot/PlotUsercard";
const UserCardList = () => {
  const { appState, appDispatch } = useContext(appContext);
  const yy = appState.victimsList.map((f, i) => (
    <PlotUsercard {...f} key={i} />
  ));

  return <div>{yy}</div>;
};

export default UserCardList;
