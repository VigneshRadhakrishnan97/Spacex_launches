import {
  ALL_LAUNCHES,
  START_PAGE,
  GET_MODAL,
  REMOVE_MODAL,
  SET_FILTER,
} from "../type";

const initialstate = {
  loading: true,
  launches: null,
  launche_list: [],
  start_page: {},
  modal: null,
};

const Launches = (state = initialstate, action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_LAUNCHES: {
      return {
        ...state,
        loading: false,
        launches: payload,
        launche_list: launch_list(
          payload,
          state.start_page.st,
          state.start_page.s,
          state.start_page.e
        ),
      };
    }
    case GET_MODAL: {
      return {
        ...state,
        loading: false,
        modal: modal(payload.launches, payload.orbit)[0],
      };
    }
    case START_PAGE: {
      return { ...state, start_page: payload };
    }
    case REMOVE_MODAL: {
      return { ...state, modal: null };
    }
    case SET_FILTER: {
      return {
        ...state,
        launche_list: launch_list(
          state.launches,
          payload.st,
          payload.s,
          payload.e
        ),
        start_page: { ...state.start_page, ...payload },
      };
    }
    default: {
      return state;
    }
  }
};

//Launches

const launch_list = (launches, status, start, end) => {
  let launch_temp = [];
  let counter = 0;

  launches.forEach((launch) => {
    let obj = {};

    if (launch.launch_success === null) obj.launch_success = "Upcoming";
    else obj.launch_success = launch.launch_success ? "Success" : "Failed";

    if (obj.launch_success !== status && status !== "All") return null;
    if (start !== "e" && end !== "e")
      if (
        !(
          new Date(start) <= new Date(launch.launch_date_utc) &&
          new Date(end) >= new Date(launch.launch_date_utc)
        )
      )
        return null;

    obj.launch_date_utc = launch.launch_date_utc;
    obj.flight_number = launch.flight_number;
    obj.mission_name = launch.mission_name;
    obj.launch_location = launch.launch_site.site_name;

    obj.rocket = launch.rocket.rocket_name;
    launch.rocket.second_stage.payloads.forEach((payload) => {
      launch_temp = [
        ...launch_temp,
        { ...obj, orbit: payload.orbit, id: 1 + counter },
      ];
    });
  });

  return launch_temp.map((launch, value) => {
    return { ...launch, id: value + 1 };
  });
};

//Modal

const modal = (launches, orbit) => {
  let launch_temp = [];
  let counter = 0;

  launches.forEach((launch) => {
    let obj = {};
    obj.launch_date_utc = launch.launch_date_utc;
    obj.flight_number = launch.flight_number;
    obj.mission_name = launch.mission_name;
    obj.launch_location = launch.launch_site.site_name;

    if (launch.launch_success === null) obj.launch_success = "Upcoming";
    else obj.launch_success = launch.launch_success ? "Success" : "Failed";

    obj.rocket = launch.rocket.rocket_name;
    obj.rocket_type = launch.rocket.rocket_type;
    obj.details = launch.details;
    obj.wikipedia = launch.links.wikipedia;
    obj.youtube = launch.links.video_link;
    obj.image = launch.links.mission_patch_small;

    launch.rocket.second_stage.payloads.forEach((payload) => {
      if (payload.orbit === orbit)
        launch_temp = [
          ...launch_temp,
          {
            ...obj,
            orbit: payload.orbit,
            id: 1 + counter,
            nasa_link: payload.cargo_manifest,
            manufacturer: payload.manufacturer,
            nationality: payload.nationality,
            payload_type: payload.payload_type,
          },
        ];
    });
  });

  return launch_temp.map((launch, value) => {
    return { ...launch, id: value + 1 };
  });
};

export default Launches;
