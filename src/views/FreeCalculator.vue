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
    <v-card
      outlined
      height="300px"
      max-height="450px"
      class="pa-3"
    >
      <div class="pa-1 flex">
        <h3>Assets</h3>
        <v-spacer></v-spacer>
        <v-btn color="blue" rounded depressed dark @click="dialog1 = true">
          <v-icon>mdi-plus</v-icon><v-spacer></v-spacer> add
        </v-btn>
      </div>
      <v-card width="100%" height="230px" elevation=0 class=" mx-auto scroll">
        <v-list three-line>
          <div v-show="assets.length < 0">
            <div align="center">no data</div>
          </div>
          <template v-for="(asset, index) in assets">
            <div :key="asset + index">
              <div class="flex pt-1 pb-1">
                <div class="pa-1 flex width-1">
                  <div class="grey--text">value:</div>
                  <div>
                    $ {{ Intl.NumberFormat().format(asset.assetValue) }}
                  </div>
                </div>
                <div class="pa-1 flex width-2">
                  <div class="grey--text">anual dividend(%):</div>
                  <div>{{ asset.divyield }}%</div>
                </div>
              </div>
              <v-divider></v-divider>
            </div>
          </template>
        </v-list>
      </v-card>
    </v-card>
    <v-card class="mt-3 pa-3 elevation--0" outlined>
      <div class="ma-3 flex">
        <div class="width-2">total investment:</div>
        <div class="width-2">${{ sumAssets().toFixed(2) }}</div>
      </div>
      <div class="ma-3 flex">
        <div class="width-2">total dividends:</div>
        <div class="width-2">${{ sumDiv().toFixed(2) }}</div>
      </div>
      <div class="ma-3 flex">
        <div class="width-2">monthly average:</div>
        <div class="width-2">${{ (sumDiv() / 12).toFixed(2) }}</div>
      </div>
      <div class="ma-3 flex">
        <div class="width-2">monthly average:</div>
        <div class="width-2">${{ (sumDiv() / 12).toFixed(2) }}</div>
      </div>

    </v-card>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      offsetTop: 0,
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
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
    },
  },

  computed: {},

  mounted() {},
};
</script>
<style scoped>
.scroll {
  overflow-y: scroll;
}
.flex {
  display: flex;
}
.width-1 {
  width: 35%;
}
.width-2 {
  width: 50%;
}
</style>
