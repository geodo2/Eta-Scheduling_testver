import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import "./resultcss/result.css";
import TablePopup from "./components/tablePopup";
import axios from "axios";

// result.css 1712
function exportHTML(emptyArr, setPopup, setPopupName) {
  var list = [];
  var len = 0;
  var h = "30px";
  var t = "";
  var class_name;
  var dif = -1;
  var first = true;
  var html;

  for (var i = 0; i < emptyArr.length; i++) {
    t = (i * 30).toString() + "px";
    if (i != 0) dif = emptyArr[i - 1].length;
    len = emptyArr[i].length;
    if (dif != len) first = true;
    else first = false;
    class_name = "subject color" + (len + 1).toString();

    let names = "";

    if (len != 0) {
      for (let name of emptyArr[i]) {
        names = names + name + ",";
      }
      names = names.substring(0, names.length - 1);
    } else {
      names = "모두 불가능한 시간!";
    }

    if (first == true)
      html = (
        <>
          <br></br>
          <p>
            <em>{len.toString()}명가능</em>
          </p>
        </>
      );
    else html = <></>;

    list.push(
      <div
        class={class_name}
        style={{ height: h, top: t }}
        onClick={() => {
          setPopup(true);
          setPopupName(names);
        }}
      >
        {html}
      </div>
    );
  }
  return list;
}
export const shareKakao = (route, title) => {
  var linkcheck="www.naver.com"
   // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init("6ec8ed312554797c30beb43e52929d74"); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
    }

    kakao.Link.sendDefault({
      objectType: "feed", // 카카오 링크 공유 여러 type들 중 feed라는 타입 -> 자세한 건 카카오에서 확인
      content: {
        title: route, // 인자값으로 받은 title
        description: route, // 인자값으로 받은 title
        imageUrl: "./images/tugas.jpg",
        link: {
          mobileWebUrl: route, // 인자값으로 받은 route(uri 형태)
          webUrl: route
        }
        
      },
      buttons: [
        {
          title: "이버튼 눌러봐",
          link: {
            mobileWebUrl: route,
            webUrl:route
          }
        }
      ]
    });
  }
};
const Result = (props) => {
  const location = useLocation();
  const [emptyTimes, setEmpty] = useState({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
  });
  const [popup, setPopup] = useState(false);
  const [popupname, setPopupName] = useState("Hello");
  const params = useParams();
  const code = params.code;
  console.log(code+ ' 확인');
  useEffect(() => {
    console.log(location.state);
    if (location.state !== true) {
      axios.get("http://localhost:8080/user_count").then((response1) => {
        console.log("User Count + 1");
      });
    }
    axios
      .post("http://localhost:8080/processing_timetable", { code: code })
      .then((response) => {
        if (response.data.result !== {}) {
          console.log(response.data.result);
          setEmpty(response.data.result);
        } else {
          alert("Fail!");
        }
      });
  }, []);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);
    var link='localhost:3000/result/'+code;
  return (
    <>
      <div class="App">
      <button onClick={() => shareKakao('www.naver.com', 't123')}>
      <img className="w-12 h-12" src="/images/tugas.jpg" />
      </button>
        <h1>
          <em>시간을 클릭해보세요!</em>
        </h1>
        <div id="container" class="timetable" style={{ height: "601px" }}>
          <div className="leftside">
            <div class="title">
              <h1></h1>
            </div>
          </div>

          <div className="main">
            <div class="tablehead">
              <table class="tablehead">
                <tbody>
                  <tr>
                    <th></th>
                    <td>월</td>
                    <td>화</td>
                    <td>수</td>
                    <td>목</td>
                    <td>금</td>
                    <td style={{ display: "none" }}>토</td>
                    <td style={{ display: "none" }}>일</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="tablebody">
              <table class="tablebody" style={{ margintop: "-2px" }}>
                <tbody>
                  <tr>
                    <th>
                      <div class="times">
                        <div class="time">오전 0시</div>
                        <div class="time">오전 1시</div>
                        <div class="time">오전 2시</div>
                        <div class="time">오전 3시</div>
                        <div class="time">오전 4시</div>
                        <div class="time">오전 5시</div>
                        <div class="time">오전 6시</div>
                        <div class="time">오전 7시</div>
                        <div class="time">오전 8시</div>
                        <div class="time">오전 9시</div>
                        <div class="time">오전 10시</div>
                        <div class="time">오전 11시</div>
                        <div class="time">오후 12시</div>
                        <div class="time">오후 1시</div>
                        <div class="time">오후 2시</div>
                        <div class="time">오후 3시</div>
                        <div class="time">오후 4시</div>
                        <div class="time">오후 5시</div>
                        <div class="time">오후 6시</div>
                        <div class="time">오후 7시</div>
                        <div class="time">오후 8시</div>
                        <div class="time">오후 9시</div>
                        <div class="time">오후 10시</div>
                        <div class="time">오후 11시</div>
                      </div>
                    </th>
                    <td>
                      <div class="cols" style={{ width: "18%" }}>
                        {exportHTML(emptyTimes["Mon"], setPopup, setPopupName)}
                      </div>
                      <div class="grids">
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                      </div>
                    </td>
                    <td>
                      <div class="cols" style={{ width: "18%" }}>
                        {exportHTML(emptyTimes["Tue"], setPopup, setPopupName)}
                      </div>
                      <div class="grids">
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                      </div>
                    </td>
                    <td>
                      <div class="cols" style={{ width: "18%" }}>
                        {exportHTML(emptyTimes["Wed"], setPopup, setPopupName)}
                      </div>
                      <div class="grids">
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                      </div>
                    </td>
                    <td>
                      <div class="cols" style={{ width: "18%" }}>
                        {exportHTML(emptyTimes["Thu"], setPopup, setPopupName)}
                      </div>
                      <div class="grids">
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                      </div>
                    </td>
                    <td>
                      <div class="cols" style={{ width: "18%" }}>
                        {exportHTML(emptyTimes["Fri"], setPopup, setPopupName)}
                      </div>
                      <div class="grids">
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                      </div>
                    </td>
                    <td style={{ display: "none" }}>
                      <div class="150px"></div>
                      <div class="grids">
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                      </div>
                    </td>
                    <td style={{ display: "none" }}>
                      <div class="cols"></div>
                      <div class="grids">
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                        <div class="grid"></div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="rightside">
            <div class="title">
              <h1></h1>
            </div>
          </div>
        </div>
        <TablePopup
          trigger={popup}
          setTrigger={setPopup}
          name={popupname}
        ></TablePopup>
      </div>
    </>
  );
};

export default Result;