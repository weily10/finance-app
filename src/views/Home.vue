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
          :loading="isLoading"
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        {{ this.quotes }}
        {{ price }}
      </v-col>
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
// import axios from "axios";
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
    };
  },
  computed: {
    items() {
      return this.quotes;
    },
  },
  watch: {
    async search(val) {
      if (this.quotes.length > 0) return;

      this.isLoading = true;

      const params = {
        q: val,
        region: "US",
      };
      await api
        .getAutoComplete(params)
        .then(res=>{
          this.quotes = res.data.quotes 
        })
        .catch(function (error) {
          console.error(error);
        })
        .finally(() => (this.isLoading = false));
    },
  },
  mounted() {},
};
</script>
