import appserver from "./appserver";
const API_URL = "/assets";

export default {
  async getAssets() {
    return await appserver.get(`${API_URL}`);
  },

  async addAsset(params) {
    return await appserver.post(`${API_URL}`,params);
  },
  async removeAsset(id) {
    return await appserver.delete(`${API_URL}/${id}`);
  }
}
