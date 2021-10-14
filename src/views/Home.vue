<template>
  <v-container>
    <v-row align="center" class="d-flex flex-column flex-sm-row align-start">
      <v-col class="text-h5 grey--text text--darken-1 pt-0"> Market</v-col>
      <v-col >
        <v-autocomplete
          dense
          label="search stocks"
          v-model="stockSearch"
          :search-input.sync="search"
          hide-no-data
          hide-selected
          :items="items"
          item-text="shortname"
          item-value="symbol"
          :loading="isLoading"
        >
        </v-autocomplete>
      </v-col>
      <v-col >
        <v-select
        
          dense
          label="select region"
          :items="regions"
          v-model="regionSelect"
          :search-input.sync="search"
        >
        </v-select>
      </v-col>
    </v-row>

    <v-card outlined>
      <v-card-title
        >{{ format(quote.lastPrice) }}<v-spacer></v-spacer>
      </v-card-title>
      <v-card-subtitle>{{ stockSearch }}</v-card-subtitle>
      <v-card-text>
        <div class="d-sm-flex justify-space-between">
          <div style="width:100%" class="mr-2">
            <div class="d-flex flex-row">
              <div class="label">Market Cap</div>
              <v-spacer></v-spacer>
              <div class="text--primary" align="right">
                {{ numFormatter(quote.marketCap) }}
              </div>
            </div>
            <div class="d-flex flex-row">
              <div class="label">Book Value</div>
              <v-spacer></v-spacer>
              <div class="text--primary" style="width:45px" align="right">
                {{ format(quote.bookValue) }}
              </div>
            </div>
            <div class="d-flex flex-row">
              <div class="label">P/E</div>
              <v-spacer></v-spacer>
              <div class="text--primary" style="width:45px" align="right">
                {{ quote.trailingPE }}
              </div>
            </div>
            <div class="d-flex flex-row">
              <div class="label">Div. yield</div>
              <v-spacer></v-spacer>
              <div class="text--primary" style="width:45px" align="right">
                {{ quote.dividendYield / 100 }}%
              </div>
            </div>
          </div>
          <div style="width:100%">
            <div class="d-flex flex-row">
              <div class="label">Beta</div>
              <v-spacer></v-spacer>
              <div class="text--primary ">{{ format(quote.beta) }}</div>
            </div>
            <div class="d-flex flex-row">
              <div class="label">EPS</div>
              <v-spacer></v-spacer>
              <div class="text--primary ">{{ format(quote.eps) }}</div>
            </div>
            <div class="d-flex flex-row">
              <div class="label">Price/Sales</div>
              <v-spacer></v-spacer>
              <div class="text--primary ">{{ quote.priceSales }}</div>
            </div>
            <div class="d-flex flex-row">
              <div class="label">Shares</div>
              <v-spacer></v-spacer>
              <div class="text--primary ">{{ numFormatter(quote.shares) }}</div>
            </div>
          </div>
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
      regionSelect: "Taiwan",
      regions: ["Taiwan", "USA", "Brazil"],
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
        lastPrice: 0,
        marketCap: 0,
        bookValue: 0,
        trailingPE: 0,
        dividendYield: 0,
        eps: 0,
        shares: 0,
        priceSales: 0,
        beta: 0,
      },
    };
  },
  computed: {
    items() {
      return this.quotes.map((key) => {
        return key.q;
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
        let resQuote = res.data[0];
        this.quote = resQuote;
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
        } else if (num > 1000000 && num < 100000000) {
          return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
        } else if (num > 1000000000) {
          return (num / 1000000000).toFixed(3) + "B";
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
          region: this.regionSelect,
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
.customcss {
  font-size: 1.5rem;
  color: rgba(94, 86, 105, 0.68);
}
.label {
  width: 100px;
}

.value {
  width: 15%;
}
</style>
