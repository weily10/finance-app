<template>
  <v-container>
    <v-dialog v-model="dialog1" width="100%">
      <v-card>
        <div class="pa-3">
          <v-text-field
            label="asset value"
            v-model="assetValue"
            type="number"
            clearable
          ></v-text-field>

          <v-text-field
            label="dividend yield"
            v-model="divyield"
            type="number"
            suffix="%"
            clearable
          ></v-text-field>
          <v-btn
            color="blue"
            dark
            depressed
            block
            clearable
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
        <v-btn color="blue" rounded depressed dark @click="dialog1 = true">
          <v-icon>mdi-plus</v-icon><v-spacer></v-spacer> add
        </v-btn>
      </v-toolbar>
      <div v-show="assets.length < 0">
        <div align="center">no data</div>
      </div>
      <template v-for="(asset, index) in assets">
        <div :key="asset + index">
          <div class="flex pt-3">
            <div class="pa-1 flex width-1">
              <div class="grey--text">value:</div>
              <div>$ {{ Intl.NumberFormat().format(asset.assetValue) }}</div>
            </div>
            <div class="pa-1 flex width-1">
              <div class="grey--text">dividend:</div>
              <div>{{ asset.divyield }}%</div>
            </div>
          </div>
          <v-divider></v-divider>
        </div>
      </template>
    </v-list>
    <v-card class="mt-5 elevation-0">
      <div class="ma-3">total investment: ${{ sumAssets().toFixed(2) }}</div>
    </v-card>
    <v-card class="elevation-0">
      <div class="ma-3">your total dividends: ${{ sumDiv().toFixed(2) }}</div>
    </v-card>
    <v-card class="elevation-0">
      <div class="ma-3">
        monthly dividend average: ${{ (sumDiv() / 12).toFixed(2) }}
      </div>
    </v-card>
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
      // console.log(assetValue,divyield);
      this.assets.push({
        assetValue: assetValue,
        divyield: divyield,
      });

      this.dialog1 = false;
    },

    sumDiv() {
      let total = 0;

      total = this.assets.reduce((acc, item) => {
        return acc + (item.assetValue * item.divyield) / 100;
      }, 0);

      return total;
    },

    sumAssets() {
      let total = 0;
      total = this.assets
        .map((item) => {
          return item;
        })
        .reduce((prev, item) => {
          return parseInt(prev) + parseInt(item.assetValue);
        }, 0);

      return total;
    },
  },

  computed: {},

  mounted() {},
};
</script>
<style scoped>
.flex {
  display: flex;
}
.width-1 {
  width: 50%;
}
</style>
