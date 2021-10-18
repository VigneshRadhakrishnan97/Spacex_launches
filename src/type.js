import clsx from "clsx";

export const ALL_LAUNCHES = "ALL_LAUNCHES";
export const START_PAGE = "START_PAGE";
export const GET_MODAL = "GET_MODAL";
export const REMOVE_MODAL = "REMOVE_MODAL";
export const SET_FILTER = "SET_FILTER";

export const column = [
  {
    headerName: "No:",
    width: 70,
    field: "id",
    disableColumnMenu: true,
    sortable: false,
    headerClassName: "column",
  },
  {
    headerName: "Launched (UTC)",
    width: 250,
    field: "launch_date_utc",
    disableColumnMenu: true,
    sortable: false,
    headerClassName: "column",
  },
  {
    headerName: "Location",
    width: 200,
    field: "launch_location",
    disableColumnMenu: true,
    sortable: false,
    headerClassName: "column",
  },
  {
    headerName: "Mission",
    width: 200,
    field: "mission_name",
    disableColumnMenu: true,
    sortable: false,
    headerClassName: "column",
  },
  {
    headerName: "Orbit",
    width: 100,
    field: "orbit",
    disableColumnMenu: true,
    sortable: false,
    headerClassName: "column",
  },
  {
    headerName: "Launch Status",
    width: 120,
    field: "launch_success",
    disableColumnMenu: true,
    sortable: false,
    headerClassName: "column",
    cellClassName: (params) =>
      clsx("status-col", {
        Success: params.value === "Success",
        Failed: params.value === "Failed",
        Upcoming: params.value === "Upcoming",
      }),
  },
  {
    headerName: "Rocket",
    width: 150,
    field: "rocket",
    disableColumnMenu: true,
    sortable: false,
    headerClassName: "column",
  },
];
