const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var db = require("./db.js");
var template = require("./template.js");
var randomstring = require("randomstring");

const { Builder, Browser, By, until } = require("selenium-webdriver");

const app = express();

app.use(express.json());
var cors = require("cors");
app.use(cors());

app.use(express.static(path.join(__dirname, "client/build")));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.post("/storeURL", function (req, res) {
  var post = req.body;
  var urls = post.urls;

  var code = randomstring.generate(7);

  // Check Code if is exist;
  db.query(`SELECT distinct(code) from code;`, function (err1, result) {
    if (err1) throw err1;
    // Check roomID is duplicate
    while (true) {
      if (result.find((o) => o.code === code)) {
        code = randomstring.generate(7);
        continue;
      } else {
        break;
      }
    }
    for (var i = 0; i < urls.length; i++) {
      db.query(
        `INSERT INTO code (code, etaURL) VALUES(?,?);`,
        [code, urls[i]],
        function (err1, result) {
          console.log("Complete Insert");
        }
      );
    }
    return res.send({
      result: code,
    });
  });
});

app.post("/processing_timetable", async function (req, res) {
  var post = req.body;
  var code = post.code;
  console.log(code);

  db.query(
    `SELECT etaURL FROM code WHERE code like ?;`,
    [code],
    async function (err1, result) {
      var urls = result;
      console.log(code);
      console.log(urls);
      res.send({
        result: await template.sumTimeTableArray(
          await template.exportEntireTimeTables(urls)
        ),
      });
    }
  );
});

app.post("/checkURL", async function (req, res) {
  var post = req.body;
  var urls = post.urls;
  const chrome = require("selenium-webdriver/chrome");
  const options = new chrome.Options();
  options.addArguments("--no-sandbox");
  options.addArguments("--headless");
  options.addArguments("window-size=1920x1080");
  options.addArguments(
    "user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36"
  );

  var error_list = [];

  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(options)
    .build();

  try {
    for (var i = 0; i < urls.length; i++) {
      await driver.get(urls[i]);
      const pageSource = await driver
        .wait(until.elementLocated(By.css("body")), 3000)
        .getAttribute("innerHTML");

      if (pageSource === "Not Found") {
        error_list.push(i);
      }
      // console.log(pageSource);
    }
  } finally {
    await driver.quit();
    return res.send({
      result: error_list,
    });
  }
});

app.get("/get_user_count", function (req, res) {
  db.query(
    "SELECT sum(value) as cntSum from user_count;",
    function (err, sum_result) {
      console.log(sum_result[0].cntSum);
      if (sum_result.length !== 0) {
        db.query(
          `SELECT value as cntDay from user_count WHERE count_date like DATE_FORMAT(NOW(), '%Y-%m-%d');`,
          function (err1, cnt_result) {
            console.log(cnt_result[0].cntDay);
            res.send({
              result: {
                cntSum: sum_result[0].cntSum,
                cntDay: cnt_result[0].cntDay,
              },
            });
          }
        );
      }
    }
  );
});

app.get("/user_count", function (req, res) {
  db.query(
    "SELECT value from user_count WHERE count_date like DATE_FORMAT(NOW(), '%Y-%m-%d');",
    function (err, result) {
      // console.log(result);
      if (result.length !== 0) {
        db.query(
          `UPDATE user_count SET value=value+1 WHERE count_date like DATE_FORMAT(NOW(), '%Y-%m-%d');`,
          function (err1, result1) {
            console.log(result1);
          }
        );
      } else {
        db.query(
          `INSERT INTO user_count (value, count_date) VALUES(1,DATE_FORMAT(NOW(), '%Y-%m-%d'));`,
          function (err1, result1) {
            console.log(result1);
          }
        );
      }
    }
  );
  // res.send({ result: Date.now() });
});

app.get("*", function (request, response) {
  response.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(8080, function () {
  console.log("listening on 8080");
});
