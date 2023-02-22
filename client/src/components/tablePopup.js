import React from "react";
import "./tablePopup.css";

function TablePopup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {/* {props.children} */}
        <h3>= 가능한 사람 =</h3>
        <h2>{props.name}</h2>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          확인
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default TablePopup;
