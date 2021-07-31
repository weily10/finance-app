<template>
  <v-container>
    <v-row align="center" class="justify-end">
      <v-col>
        <v-autocomplete
          label="search stocks"
          v-model="stockSearch"
          :search-input.sync="search"
          hide-no-data
          hide-selected
          :items="items"
          item-text="Description"
          return-object
        ></v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          label="price"
          v-model="price"
          type="number"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-text-field
          label="shares"
          v-model="shares"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-text-field
          label="dividend yield"
          v-model="divyield"
          type="number"
          suffix="%"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Total Investment:
        {{ Intl.NumberFormat().format(price * shares * 1000) }} <br />
        Dividend paid:
        {{
          Intl.NumberFormat().format((price * shares * 1000 * divyield) / 100)
        }}
        <br />
        You get {{ (price * shares * 1000 * divyield) / 100 / 12 }} per month
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import HelloWorld from '../components/HelloWorld'
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      quotes: [],
      divyield: 0.0,
      shares: 0,
      stockName: "",
      price: 0.0,
      divEarned: 0,
      dividendMonth: 0,
      stockSearch: null,
      search: null,
    };
  },
  computed: {
    items() {
      return this.quotes.map((quote) => {
        const Description =
          quote.symbol.length > 60
            ? quote.Description.slice(0, 60) + "..."
            : quote.Description;

        return Object.assign({}, quote, { Description });
      });
    },
  },
  watch: {
    async search(val) {
      const options = {
        method: "GET",
        url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete",
        params: { q: val, region: "US" },
        headers: {
          "x-rapidapi-key":
            "c443088b61msh8caed034aacf628p17d611jsnb0d8e92e252e",
          "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
        },
      };
      await axios
        .request(options)
        .then((response) => {
          console.log(response.data.quotes);
          console.log(this);
          this.quotes = response.data.quotes;
        })
        .catch(function(error) {
          console.error(error);
        });
    },
  },
  mounted() {
    // const options = {
    //   method: "GET",
    //   url: "https://apidojo-yahoo-finance-v1.p.rapidapi.com/auto-complete",
    //   params: { q: this.search, region: "US" },
    //   headers: {
    //     "x-rapidapi-key": "c443088b61msh8caed034aacf628p17d611jsnb0d8e92e252e",
    //     "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com",
    //   },
    // };
    // axios
    //   .request(options)
    //   .then(function(response) {
    //     console.log(response.data);
    //   })
    //   .catch(function(error) {
    //     console.error(error);
    //   });
    // Make a request for a user with a given ID
  },
};
</script>
