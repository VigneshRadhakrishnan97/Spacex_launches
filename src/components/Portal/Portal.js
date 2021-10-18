import React from 'react'
import ReactDOM from 'react-dom'
import '../../App.css'

const Portal = (props) => {
    return ( ReactDOM.createPortal(
        <div className="portal" onClick={()=>props.close()}>
            {props.render}
        </div>,document.getElementById("root2"))
    )
}

export default Portal
