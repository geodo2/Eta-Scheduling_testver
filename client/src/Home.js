import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "./components/Popup";
import "./css/Home.css";
import "./App.js";
import "./result.js";

async function len_validation(url_list) {
  var valid = -1;
  for (var i = 0; i < url_list.length; i++) {
    if (url_list[i].length === 0) {
      valid = i + 1;
    }
    if (i === url_list.length - 1) {
      return valid;
    }
  }
}

async function format_validation(url_list) {
  let eta_regex = /^https:\/\/everytime.kr\/@/;
  var valid = -1;
  for (var i = 0; i < url_list.length; i++) {
    // console.log(url_list[i]);
    if (eta_regex.test(String(url_list[i])) === false) {
      valid = i + 1;
    }
    if (i === url_list.length - 1) {
      return valid;
    }
  }
}

function Home() {
  let navigator = useNavigate();

  const [popup, setPopup] = useState(true);
  const [user_count, setUserCount] = useState([<></>]);
  const [errorMessage, setErrorMessage] = useState("");
  const [peopleCount, setPeopleCount] = useState(1);
  const [takeUrl, setTakeUrl] = useState([
    <>
      <input
        type="text"
        placeholder="에브리타임 시간표 공유 링크를 입력해주세요"
        name="1"
        id="1"
        class="u-input u-input-rectangle u-radius-12 .u-grey-light-1 u-input-1"
        required=""
      ></input>
      <br />
    </>,
  ]);

  useEffect(() => {
    axios.get("http://localhost:8080/user_count").then((response) => {
      console.log(response.data.result);
    });
    axios.get("http://localhost:8080/get_user_count").then((response2) => {
      console.log(response2.data.result);
      setUserCount([
        <>
          <p>총 이용자 수 : {response2.data.result.cntSum}</p>
          <p>하루 이용자 수 : {response2.data.result.cntDay}</p>
        </>,
      ]);
    });
  }, []);

  return (
    <>
      <div class="App">
        <div class="u-clearfix u-valign-top u-section-1" id="carousel_1834">
          <div class="u-container-style u-expanded-width u-group u-palette-5-light-2 u-shape-rectangle u-group-1">
            <div class="u-container-layout u-container-layout-1">
              <h1 class="u-align-center u-custom-font u-font-merriweather u-text u-text-default u-text-1">
                Eta-Scheduling
              </h1>
              <h4 class="tex123">
                에브리타임 시간표 링크를 입력해 시간표를 ​비교해보세요 !
              </h4>
              <h4 class="tex123">{errorMessage}</h4>

              <div>{takeUrl}</div>

              <div class="u-align-center u-form-group u-form-submit">
                <input
                  type="button"
                  className="button123"
                  value={" = 스케줄링 = "}
                  onClick={async (event) => {
                    setErrorMessage("URL 확인 중...");
                    var urls = [];
                    for (var i = 1; i <= peopleCount; i++) {
                      urls.push(document.getElementById(String(i)).value);
                      document.getElementById(i).style.backgroundColor =
                        "initial";
                      document.getElementById(i).style.color = "inherit";
                    }
                    if (urls.length === 0) {
                      setErrorMessage("입력된 URL이 없습니다 :)");
                    } else {
                      axios
                        .post("http://localhost:8080/checkURL", {
                          urls: urls,
                        })
                        .then(async (response) => {
                          var error_list = response.data.result;
                          var len_valid = await len_validation(urls);
                          var format_valid = await format_validation(urls);
                          if (
                            (len_valid === -1) &
                            (format_valid === -1) &
                            (error_list.length === 0)
                          ) {
                            setErrorMessage("오류 없음!!!");
                            axios
                              .post("http://localhost:8080/storeURL", {
                                urls: urls,
                              })
                              .then((response) => {
                                if (response.data.result !== "") {
                                  // console.log(response.data.result);
                                  var code = response.data.result;
                                  navigator("/result/" + code, {
                                    state: true,
                                  });
                                  console.log(code);
                                } else {
                                  setErrorMessage("Fail!");
                                }
                              });
                          } else if (len_valid !== -1) {
                            document.getElementById(
                              len_valid
                            ).style.backgroundColor = "#ffd6d6";
                            document.getElementById(len_valid).style.color =
                              "black";
                            setErrorMessage("비었음!! URL을 입력해주세요");
                          } else if (format_valid !== -1) {
                            document.getElementById(
                              format_valid
                            ).style.backgroundColor = "#ffd6d6";
                            document.getElementById(format_valid).style.color =
                              "black";
                            setErrorMessage("에브리타임 URL을 확인해주세요");
                          } else if (error_list.length !== 0) {
                            for (var index of error_list) {
                              document.getElementById(
                                index + 1
                              ).style.backgroundColor = "#ffd6d6";
                              document.getElementById(index + 1).style.color =
                                "black";
                            }
                            setErrorMessage("에브리타임 URL을 확인해주세요");
                          }
                        });
                    }
                    console.log(errorMessage);
                  }}
                ></input>
                <input
                  type="submit"
                  value="submit"
                  class="u-form-control-hidden"
                />
                <input
                  style={{ display: "inline", alignItems: "center" }}
                  type="button"
                  className="button1234"
                  value="인원추가"
                  onClick={() => {
                    var curr_peopleCount = peopleCount;
                    curr_peopleCount++;
                    setPeopleCount(curr_peopleCount);
                    var curr_url = takeUrl;
                    curr_url.push(
                      <>
                        <input
                          input
                          type="text"
                          placeholder="에브리타임 시간표 공유 링크를 입력해주세요"
                          name={String(curr_peopleCount)}
                          id={String(curr_peopleCount)}
                          class="u-input u-input-rectangle u-radius-12 .u-grey-light-1 u-input-1"
                          required=""
                        ></input>
                        <br />
                      </>
                    );
                    setTakeUrl(curr_url);
                  }}
                ></input>
                <input
                  style={{ display: "inline", alignItems: "center" }}
                  type="button"
                  className="button1234"
                  value="인원삭제"
                  onClick={() => {
                    var curr_peopleCount = peopleCount;
                    curr_peopleCount--;
                    setPeopleCount(curr_peopleCount);
                    var curr_url = takeUrl;
                    curr_url.pop();
                  }}
                ></input>
                <div>{user_count}</div>
              </div>
            </div>
          </div>
        </div>
        <Popup trigger={popup} setTrigger={setPopup}></Popup>
      </div>
    </>
  );
}
export default Home;
