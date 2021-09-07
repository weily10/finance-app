import appserver from "./appserver";
const API_URL = "/get-quotes";

export default {
  async getQuote(params) {
    return await appserver.get(`${API_URL}`, { params });
  }
};
