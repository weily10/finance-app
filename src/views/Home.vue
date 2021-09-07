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
          cache-items
          item-text="shortname"
          item-value="symbol"
          :loading="isLoading"
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-card outlined>
      <v-card-title>{{ stockSearch }}</v-card-title>
      <v-card-text>
        <div class="d-flex flex-row">
          <div class="pr-2  label">Market Cap:</div>
          <div class="text--primary ">
            {{ numFormatter(quote.marketCap) }}
          </div>
        </div>
        <div class="d-flex flex-row">
          <div class="pr-2  label">Book Value:</div>
          <div class="text--primary ">{{ format(quote.bookValue) }}</div>
        </div>
        <div class="d-flex flex-row">
          <div class="pr-2  label">P/E:</div>
          <div class="text--primary ">{{ format(quote.trailingPE) }}</div>
        </div>
      </v-card-text>
    </v-card>
    <v-row>
      <v-col> </v-col>
    </v-row>
    <v-row>
      <v-col> </v-col>
      <v-col> </v-col>
    </v-row>
    <v-row>
      <v-col> </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../api";

export default {
  components: {},
  data() {
    return {
      isLoading: false,
      quotes: [],
      divyield: 0.0,
      shares: 0,
      stockName: "",
      price: 0.0,
      divEarned: 0,
      dividendMonth: 0,
      stockSearch: null,
      search: null,
      symbol: null,
      quote: {
        marketCap: 0,
        bookValue: 0,
        trailingPE: 0,
      },
    };
  },
  computed: {
    items() {
      return this.quotes.map(key=>{
        return key.q
      });
    },
  },
  watch: {
    search(val) {
      val && val !== this.stockSearch && this.querySelections(val);
    },
    stockSearch(val) {
      if (val === null || val === "") return;
      const params = {
        symbols: val,
      };
      api.getQuote(params).then((res) => {
        let resQuote = res.data[0]
        this.quote = resQuote
        // console.log(res);
        // Object.keys(this.quote).map((key) => {
        //   // this.quotes[key] *= 2;
        //   let resQuote = res.data.quoteResponse;
        //   Object.keys(resQuote).map((key1) => {
        //       console.log(key,key1);
        //     if (key === key1) {
        //       console.log(this.quote[key],key);
        //       this.quote[key] = resQuote[key1];
        //     }
        //   });
        // });
      });
    },
  },
  methods: {
    format(value) {
      return value ? value.toFixed(2) : 0;
    },
    numFormatter(num) {
      if (num) {
        if (num > 999 && num < 1000000) {
          return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
        } else if (num > 1000000) {
          return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
        } else if (num < 900) {
          return num; // if value < 1000, nothing to do
        }
      } else {
        return "-";
      }
    },
    querySelections(val) {
     
      this.isLoading = true;
      setTimeout(() => {
        const params = {
          q: val,
          region: "USA",
        };
        api
          .getAutoComplete(params)
          .then((res) => {
            this.quotes = res.data;
          })
          .catch(function(error) {
            console.error(error);
          })
          .finally(() => (this.isLoading = false));
      }, 500);
    },
  },

  mounted() {},
};
</script>

<style scoped>
.label {
  width: 100px;
}

.value {
  width: 15%;
}
</style>
