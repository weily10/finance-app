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
          item-text="shortname"
          item-value="shortname"
          return-object
        >
        </v-autocomplete>
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
// import axios from "axios";
import api from "../api";

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
      return this.quotes;
    },
  },
  watch: {
    async search(val) {
      const params = {
        q: val,
        region: "US",
      };
      await api
        .getAutoComplete(params)
        .then((res) => {
          console.log(res.data);
          this.quotes = res.data.quotes;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  mounted() {
   
  },
};
</script>
