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
    <v-card outlined height="300px" max-height="450px" class="pa-3">
      <div class="pa-1 flex">
        <h3>Assets</h3>
        <v-spacer></v-spacer>
        <v-btn color="blue" rounded depressed dark @click="dialog1 = true">
          <v-icon>mdi-plus</v-icon><v-spacer></v-spacer> add
        </v-btn>
      </div>
      <v-card width="100%" height="230px" elevation="0" class="mx-auto scroll">
        <v-list three-line>
          <div v-show="assets.length < 0">
            <div align="center">no data</div>
          </div>
          <template v-for="(asset, index) in assets">
            <div :key="asset + index">
              <div class="flex pt-1 pl-1">
                <v-list-item-content class="pa-0">
                  <v-list-item-title>
                    $ {{ Intl.NumberFormat().format(asset.assetValue) }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="grey--text"
                    >value</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-content class="pa-1 width-2">
                  <v-list-item-title>{{ asset.divyield }}%</v-list-item-title>
                  <v-list-item-subtitle class="grey--text"
                    >anual dividend(%)</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-content class="pa-0">
                  <v-btn icon small @click="deleteItem(index)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-content>
              </div>
              <v-divider></v-divider>
            </div>
          </template>
        </v-list>
      </v-card>
    </v-card>
    <v-card class="mt-3 pa-3" outlined>
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
    </v-card>
    <v-card class="mt-3 pa-3" outlined>
      <v-text-field
        label="target value(monthly)"
        type="number"
        clearable
        v-model="targetvalue"
      ></v-text-field>
      <v-text-field
        label="yield"
        v-model="yield1"
        type="number"
        suffix="%"
        clearable
      ></v-text-field>
      ${{ Intl.NumberFormat().format(((targetvalue*12)/(yield1/100))- sumAssets().toFixed(2))}} left to achieve freedom with average {{yield1}}% yield
    </v-card>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      yield1:0,
      targetvalue: 0,
      valueLeft: 0,
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
    deleteItem(index) {
      this.assets.splice(index, 1);
    },
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
  width: 60%;
}
</style>
