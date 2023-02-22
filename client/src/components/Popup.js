import React from "react";
import "./Popup.css";

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {props.children}
        <h2>
          <em>개인 정보 수집 및 이용 동의</em>
        </h2>
        <br></br>
        <p>
          BOB-GO 사이트는 이용자 식별과 카톡 공유 등을 위해 아래와 같이 개인
          정보를 수집,이용 합니다.
        </p>
        <p>
          <em>수집 목적</em>
        </p>
        <p>이용자 식별 및 카톡 공유</p>
        <p>
          <em>수집 항목</em>
        </p>
        <p>에브리타임 URL</p>
        <br></br>
        <p style={{ fontSize: "20px" }}>
          <em>위 개인정보 수집,이용에 동의합니다</em>
        </p>
        <button className="close-btn" onClick={() => props.setTrigger(false)}>
          동의함
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
