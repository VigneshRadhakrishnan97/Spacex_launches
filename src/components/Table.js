import React, { useEffect, useState } from "react";
import { DataGrid, useGridSlotComponentProps } from "@mui/x-data-grid";
import { makeStyles } from "@material-ui/styles";
import { column } from "../type";
import Pagination from "@material-ui/lab/Pagination";
import { connect } from "react-redux";
import Modal from "./Modal";
import { removemodal } from "../Actions";
import Spinner from "./Spinner";

const Table = ({
  launche_list,
  start_param,
  removemodal,
  loading,
  start_page,
}) => {
  const [mod_val, setMod_val] = useState({
    f: start_param.f,
    o: start_param.o,
    set: start_param.f === "0" && start_param.o === "e" ? false : true,
  });

  const closemodel = () => {
    setMod_val({ ...mod_val, f: 0, o: "e", set: false });
    removemodal();
  };

  const useStyles = makeStyles({
    root: {
      // display: "flex",

      "& .Success": {
        backgroundColor: "#ccffcc",
        color: "#006600",
      },
      "& .Upcoming": {
        backgroundColor: "#ffd1b3",
        color: "#993d00",
      },
      "& .Failed": {
        backgroundColor: "#ffe6e6",
        color: "#800000",
      },
    },
  });
  const classes = useStyles();
  //pagination
  const Paginations = () => {
    const { state, apiRef } = useGridSlotComponentProps();

    useEffect(() => {
      state.pagination.page = start_param.no - 1;
    }, []);
    window.history.replaceState(
      null,
      null,
      `/launch/page/${state.pagination.page + 1}/${mod_val.f}/${
        mod_val.o
      }/filter/${start_page.st}/${start_page.s}/${start_page.e}`
    );
    return (
      <Pagination
        variant="outlined"
        shape="rounded"
        count={state.pagination.pageCount}
        page={state.pagination.page + 1}
        onChange={(event, value) => {
          return apiRef.current.setPage(value - 1);
        }}
      />
    );
  };

  //table
  return (
    <div className="table">
      {mod_val.set ? (
        <Modal close={closemodel} flightno={mod_val.f} orb={mod_val.o} />
      ) : null}
      {loading ? <Spinner /> : null}

      <DataGrid
        className={classes.root}
        pagination
        pageSize={12}
        rowsPerPageOptions={[5]}
        components={{
          Pagination: Paginations,
        }}
        disableColumnSelector
        columns={column}
        rows={launche_list}
        onRowClick={(params) => {
          setMod_val({
            ...mod_val,
            set: true,
            f: params.row.flight_number,
            o: params.row.orbit,
          });
        }}
      />
    </div>
  );
};

const mapStatetoProps = (state) => {
  return state.Launches;
};
export default connect(mapStatetoProps, { removemodal })(Table);
