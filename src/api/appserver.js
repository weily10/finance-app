import axios from "axios";

const appserve = axios.create({
  baseURL: "https://apidojo-yahoo-finance-v1.p.rapidapi.com"
});

export default appserve;
