import appserver from "./appserver";
const API_URL = "/auto-complete";


export default {
  async getAutoComplete(params) {
    return await appserver.get(`${API_URL}`, { params });
  },

  async getQuote(params){
    return await appserver.get('/market/v2/get-quotes', { params });

  }
}

  



