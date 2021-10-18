import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllLaunches, startpage } from "../Actions";
import Table from "./Table";
import Dates from "./Filter/Dates";
import Error from "./Error";

const Launch = (props) => {
  useEffect(() => {
    props.startpage(props.match.params);

    props.getAllLaunches();
  }, []);

  return (
    <div>
      <Error>
        <div className="filter">
          <Dates start_param={props.match.params} />
        </div>

        <Table start_param={props.match.params} />
        <p>
          <i style={{ float: "right" }}>by Vignesh</i>
        </p>
      </Error>
    </div>
  );
};

export default connect(null, { getAllLaunches, startpage })(Launch);
