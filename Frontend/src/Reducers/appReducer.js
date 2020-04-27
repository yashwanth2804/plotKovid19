export const appReducer = (state, action) => {
  const dupState = state;
  const { type, payload } = action;
  switch (type) {
    // case "SET_LOGGEDIN_USERNAME":
    //   return { ...dupState, name: payload.name };
    case "SET_WINDOW_WIDTH":
      return { ...dupState, width: payload.width };
    case "LOG_OUT":
      return { ...dupState, name: "", isLoggedIn: false };

    case "LOG_IN":
      return { ...dupState, name: payload.name, isLoggedIn: true };

    case "REGISTRATION":
      return {
        ...dupState,
        registration: { ...dupState.registration, ...payload },
      };

    case "INC_INDEX":
      return { ...dupState, step_index: dupState.step_index + 1 };

    case "DEC_INDEX":
      return { ...dupState, step_index: dupState.step_index - 1 };

    case "TOGGLE_MODAL_PLOT_MAP":
      return { ...dupState, showModal_Plot_Map: payload.visible };

    case "VICTIMS_LIST":
      return { ...dupState, victimsList: payload.victims };

    case "ADD_VICTIMS_LIST":
      return {
        ...dupState,
        victimsList: [...dupState.victimsList, ...payload.victims],
      };

    case "SELECTED_VICTIM":
      return {
        ...dupState,
        selectedVictim: payload.selectedVictim,
      };

    case "INTERSECTED_VICTIMS":
      return {
        ...dupState,
        intersect: {
          ...dupState.intersect,
          IntersectedVictims: payload.IntersectedVictims,
        },
      };

    case "SELECTED_INTERSECTED_VICTIMS":
      return {
        ...dupState,
        intersect: {
          ...dupState.intersect,
          selectedIntersectVictim: payload.selectedIntersectVictim,
          showMap: true,
          center: payload.center,
          map: { ...dupState.intersect.map, ...payload.map },
        },
      };

    case "SIMULATE":
      return {
        ...dupState,
        intersect: {
          ...dupState.intersect,
          map: { ...dupState.intersect.map, ...payload.map },
        },
      };

    case "RESET_SIMULATE":
      return {
        ...dupState,
        intersect: {
          ...dupState.intersect,
          map: { ...dupState.intersect.map, ...payload.map },
        },
      };

    case "UPDATE_SPEED_FACTOR":
      return {
        ...dupState,
        intersect: {
          ...dupState.intersect,
          map: { ...dupState.intersect.map, speedFactor: payload.speedFactor },
        },
      };

    case "CLOCK_TIMER":
      return {
        ...dupState,
        intersect: {
          ...dupState.intersect,
          map: { ...dupState.intersect.map, clockTimer: payload.clockTimer },
        },
      };

    case "UPDATE_USER_CORDS":
      return {
        ...dupState,
        intersect: {
          ...dupState.intersect,
          map: {
            ...dupState.intersect.map,
            intersectionlines: {
              ...dupState.intersect.map.intersectionlines,
              ...payload.intersectionlines,
            },
          },
        },
      };

    case "UPDATE_VICTIM_CORDS":
      return {
        ...dupState,
        intersect: {
          ...dupState.intersect,
          map: {
            ...dupState.intersect.map,
            intersectionlines: {
              ...dupState.intersect.map.intersectionlines,
              ...payload.intersectionlines,
            },
          },
        },
      };

    default:
      return dupState;
  }
};
