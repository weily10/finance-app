<template>
  <v-container>
    <v-dialog v-model="dialog1" width="100%">
      <v-card>
        <div class="pa-3">
          <v-text-field
            label="asset value"
            v-model="assetValue"
            type="number"
          ></v-text-field>

          <v-text-field
            label="dividend yield"
            v-model="divyield"
            type="number"
            suffix="%"
          ></v-text-field>
          <v-btn
            color="blue"
            dark
            depressed
            block
            @click="addData(assetValue, divyield)"
            >ok</v-btn
          >
        </div>

        <!-- <v-col>
          Total Investment:
          {{ Intl.NumberFormat().format(assetValue * shares * 1000) }} <br />
          Dividend paid:
          {{
            Intl.NumberFormat().format(
              (assetValue * shares * 1000 * divyield) / 100
            )
          }}
          <br />
          You get {{ (assetValue * shares * 1000 * divyield) / 100 / 12 }} per
          month
        </v-col> -->
      </v-card>
    </v-dialog>
    <v-list three-line>
   
      <v-toolbar depressed class="elevation-0">
        <h3>Assets</h3>
        <v-spacer></v-spacer>
        <v-btn color="blue"  rounded depressed   dark @click="dialog1 = true"
          > <v-icon>mdi-plus</v-icon><v-spacer></v-spacer>  add </v-btn>
      </v-toolbar>
          <div v-show="assets.length < 0">
        <div align="center">no data</div>
       
      </div>
      <template v-for="(asset, index) in assets">
        <div :key="asset + index">
          <div class="flex pt-3">
            <div class="pa-3"><span class="grey--text">value: </span>$ {{ asset.assetValue }}</div>
            <div class="pa-3"><span class="grey--text">dividend: </span>{{ asset.divyield }}%</div>
          </div>
          <v-divider></v-divider>
        </div>
      </template>
    </v-list>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      assets: [],
      dialog1: false,
      quotes: [],
      divyield: 0.0,
      shares: 0,
      stockName: "",
      assetValue: 0.0,
      divEarned: 0,
      dividendMonth: 0,
      stockSearch: null,
      search: null,
    };
  },
  methods: {
    addData(assetValue, divyield) {
      this.dialog1 = false;
      // console.log(assetValue,divyield);
      this.assets.push({
        assetValue: Intl.NumberFormat().format(assetValue),
        divyield: divyield,
      });
    },
  },

  mounted() {},
};
</script>
<style scoped>
.flex {
  display: flex;
}
</style>