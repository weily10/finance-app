// import appserver from "./appserver";
// const API_URL = "/auto-complete";


export default {
  async getAutoComplete(params) {
    return await { params }, {
      data: {
        quotes: ["TSMC", "Vale", "Nvidia"]
      }
    }
  },

  async getQuote(params) {
    return await { params }, {
      data: {
        quoteResponse: {
          marketCap: 23034003,
          bookValue: 1932,
          trailingPE: 234,
        }
      }
    }

  }
}





