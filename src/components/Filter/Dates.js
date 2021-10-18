import React, { useState } from "react";
import { connect } from "react-redux";
import { setStatus } from "../../Actions";

const Dates = (props) => {
  const [date, setDate] = useState({
    s: props.start_param.s,
    e: props.start_param.e,
    st: props.start_param.st,
  });
  const onchnage = (e) => {
    setDate({ ...date, [e.target.name]: e.target.value });
    if (e.target.name === "st" && e.target.value !== props.start_page.st)
      props.setStatus({ st: e.target.value, s: date.s, e: date.e });
    else if (e.target.name === "s" && e.target.value !== props.start_page.s) {
      if (date.e === "e") return;
      props.setStatus({
        st: date.st,
        s: e.target.value,
        e: date.e,
      });
    } else if (e.target.name === "e" && e.target.value !== props.start_page.e) {
      if (date.s === "e") return;
      props.setStatus({
        st: date.st,
        s: date.s,
        e: e.target.value,
      });
    }
  };

  return (
    <div className="date">
      <b>START :</b>
      <input
        className="dropdown"
        type="date"
        value={date.s}
        name="s"
        onChange={onchnage}
      ></input>
      <b>END :</b>
      <input
        className="dropdown"
        type="date"
        value={date.e}
        name="e"
        onChange={onchnage}
      ></input>
      <i className="fas fa-filter"></i>

      <select name="st" value={date.st} onChange={onchnage} className="status">
        <option value="All">All Launches</option>
        <option value="Upcoming">Upcoming Launches</option>
        <option value="Success">Successful Launches</option>
        <option value="Failed"> Failed Launches</option>
      </select>
    </div>
  );
};

const mapStatetoProps = (state) => {
  return state.Launches;
};
export default connect(mapStatetoProps, { setStatus })(Dates);
