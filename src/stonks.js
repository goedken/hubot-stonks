// Description:
//   stonks
//
// Commands:
//   hubot stonks - stonks
//
// Authors:
//   agoedken

const axios = require("axios");
const moment = require("moment");

const stonksyes = "https://i.imgur.com/mcKUw3z.jpg";
const stonksno = "https://imgur.com/an1NjOQ.jpg";
const stonkserr = "https://imgur.com/xgRjha4.jpg";

const API_KEY = "DL6RPCZCNBNH594Q";
const FUNCTION_KEY = "Time Series (Daily)";
const URL =
  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=DJI&apikey=" +
  API_KEY;

const TODAY = moment().format("YYYY-MM-DD");

module.exports = robot => {
  // Checks every message sent for stonks
  robot.hear(/stonks/i, async msg => {
    try {
      const img = await getStonks();
      msg.send(img);
    } catch (err) {
      msg.send(stonkserr);
    }
  });

  async function getStonks() {
    const { data } = await axios.get(URL);
    const today = data[FUNCTION_KEY][TODAY];
    const openNum = parseFloat(today["1. open"]);
    const closeNum = parseFloat(today["4. close"]);
    if (closeNum > openNum) {
      return stonksyes;
    } else {
      return stonksno;
    }
  }
};
