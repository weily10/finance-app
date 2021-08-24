import appserver from "./appserver";
const API_URL = "/auto-complete";


export default {
  async getAutoComplete(params) {
    return await appserver.get(`${API_URL}`, { params });
  },
}

  



