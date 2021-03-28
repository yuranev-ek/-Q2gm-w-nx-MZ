import axios from "axios";

axios.defaults.baseURL = "http://www.filltext.com/";

export async function getSmallData() {
  return (
    await axios.get(
      "?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
    )
  ).data;
}

export async function getBigData() {
  return (
    await axios.get(
      "?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}"
    )
  ).data;
}
