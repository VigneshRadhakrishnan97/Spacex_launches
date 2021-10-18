import React,{useEffect} from 'react'
import Portal from './Portal/Portal'
import { connect } from "react-redux";
import { getLaunch } from "../Actions";
import Nasa from "../images/nasa.png";

const Modal = (props) => {
    useEffect(()=>{
        console.log(props);
        props.getLaunch(props.flightno,props.orb);
    },[]);

    const status=()=>{
        if(props.modal.launch_success==="Success")
        return (
          <span style={{ backgroundColor: "#ccffcc", color: "#006600" }}>
            {props.modal.launch_success}
          </span>
        );
        else if(props.modal.launch_success==="Upcoming")
        return (
          <span style={{ backgroundColor: "#ffd1b3", color: "#993d00" }}>
            {props.modal.launch_success}
          </span>
        );
         else if(props.modal.launch_success==="Failed")
        return (
          <span style={{ backgroundColor: "#ffe6e6", color: "#800000" }}>
            {props.modal.launch_success}
          </span>
        );
    }
    let  render=null;
    if(props.modal!==null)
    {
       render = (
         <div className="model" onClick={(e) => e.stopPropagation()}>
           <div className="grid-container">
             <div className="item1">
               <img src={props.modal.image} alt=""></img>
             </div>
             <div className="item2">
               {props.modal.mission_name}
               {status()}
               <i onClick={() => props.close()}>&#10006;</i>
             </div>
             <div className="item3">{props.modal.rocket}</div>
             <div className="item4">
               <a href={props.modal.nasa_link} target="_blank" rel="noreferrer">
                 <img src={Nasa} alt=""></img>
               </a>
               <a href={props.modal.youtube} target="_blank" rel="noreferrer">
                 <i className="fab fa-youtube"></i>
               </a>
               <a href={props.modal.wikipedia} target="_blank" rel="noreferrer">
                 <i className="fab fa-wikipedia-w"></i>
               </a>
             </div>
             <div className="item5">
               {props.modal.details}
               <a href={props.modal.wikipedia} target="_blank" rel="noreferrer">
                 Wikipedia
               </a>
             </div>
             <div className="item6">
               <ul>
                 <li>
                   <div className="cells">Flight Number</div>
                   <div className="cells">{props.modal.flight_number}</div>
                 </li>
                 <li>
                   <div className="cells">Mission Name</div>
                   <div className="cells">{props.modal.mission_name}</div>
                 </li>
                 <li>
                   <div className="cells">Rocket Type</div>
                   <div className="cells">{props.modal.rocket_type}</div>
                 </li>
                 <li>
                   <div className="cells">Rocket Name</div>
                   <div className="cells">{props.modal.rocket}</div>
                 </li>
                 <li>
                   <div className="cells">Manufacturer</div>
                   <div className="cells">{props.modal.manufacturer}</div>
                 </li>
                 <li>
                   <div className="cells">Nationality</div>
                   <div className="cells">{props.modal.nationality}</div>
                 </li>
                 <li>
                   <div className="cells">Launch Date</div>
                   <div className="cells">{props.modal.launch_date_utc}</div>
                 </li>
                 <li>
                   <div className="cells">Payload Type</div>
                   <div className="cells">{props.modal.payload_type}</div>
                 </li>
                 <li>
                   <div className="cells">Orbit</div>
                   <div className="cells">{props.modal.orbit}</div>
                 </li>
                 <li>
                   <div className="cells">Launch Site</div>
                   <div className="cells">{props.modal.launch_location}</div>
                 </li>
               </ul>
             </div>
           </div>
         </div>
       );
    }
   
    return (
      <React.Fragment>
        <Portal render={render} close={props.close} />
      </React.Fragment>
    );
}

const mapStatetoProps = (state) => {
  return state.Launches;
};

export default connect(mapStatetoProps, { getLaunch })(Modal);
