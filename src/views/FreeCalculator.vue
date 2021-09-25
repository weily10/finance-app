<template>
  <v-container>
    <v-dialog v-model="dialog1" width="420">
      <v-card>
        <v-card-title>
          Add your asset and dividend
        </v-card-title>
        <v-card-text>
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
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-card outlined height="320px" max-height="450px">
      <v-card-title
        >Assets <v-spacer></v-spacer>
        <v-card-actions>
          <v-btn color="blue" rounded depressed dark @click="dialog1 = true">
            <v-icon>mdi-plus</v-icon><v-spacer></v-spacer> add
          </v-btn>
        </v-card-actions></v-card-title
      >

      <v-card width="100%" height="230px" elevation="0" class="mx-auto scroll">
        <v-list>
          <div v-if="assets.length <= 0">
            <div align="center">no data</div>
          </div>
          <template v-for="(asset, index) in assets">
            <div :key="asset + index">
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    $ {{ Intl.NumberFormat().format(asset.assetValue) }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="grey--text"
                    >value</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-content class="width-2">
                  <v-list-item-title>{{ asset.divyield }}%</v-list-item-title>
                  <v-list-item-subtitle class="grey--text"
                    >anual dividend(%)</v-list-item-subtitle
                  >
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn icon small @click="deleteItem(asset)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-action>
              </v-list-item>
              <v-divider></v-divider>
            </div>
          </template>
        </v-list>
      </v-card>
    </v-card>
    <v-card class="mt-3 pa-3" outlined>
      <div class="ma-3 flex">
        <div class="width-2">total investment:</div>
        <div class="width-2" align="right">
          ${{ Intl.NumberFormat().format(sumAssets()) }}
        </div>
      </div>
      <div class="ma-3 flex">
        <div class="width-2">total dividends:</div>
        <div class="width-2" align="right">
          ${{ Intl.NumberFormat().format(sumDiv()) }}
        </div>
      </div>
      <div class="ma-3 flex">
        <div class="width-2">monthly average:</div>
        <div class="width-2" align="right">
          ${{ Intl.NumberFormat().format(sumDiv() / 12) }}
        </div>
      </div>
    </v-card>
    <v-card class="mt-3 pa-6" outlined>
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
      <v-card-text v-if="sumDiv() / 12 >= targetvalue">
        you've reached your goal
      </v-card-text>
      <v-card-text v-else>
        <p>
          ${{ remainValue() }} left to achieve freedom <br class="brnodisplay" />
          with average {{ yield1 }}% yield
        </p>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import api from "../api";
export default {
  components: {},
  data() {
    return {
      yield1: 0,
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
    async deleteItem(item) {
      await api
        .removeAsset(item.id)
        .then((res) => {
          this.assets.splice(this.assets.indexOf(item), 1);
          console.log(res);
        })
        .catch(function(error) {
          console.error(error);
        });
    },
    async addData(assetValue, divyield) {
      const params = {
        assetValue: assetValue,
        divyield: divyield,
      };
      await api
        .addAsset(params)
        .then((res) => {
          this.assets.push({
            assetValue: assetValue,
            divyield: divyield,
          });
          this.getAssets();
          this.dialog1 = false;
          console.log("success", res);
        })
        .catch(function(error) {
          console.error(error);
        });
    },

    async getAssets() {
      await api.getAssets().then((res) => {
        console.log(res);
        this.assets = res.data;
      });
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

    remainValue() {
      let value = 0;
      value = Intl.NumberFormat().format(
        (this.targetvalue * 12) / (this.yield1 / 100) -
          this.sumAssets().toFixed(2)
      );

      return value;
    },
  },

  computed: {},

  mounted() {
    this.getAssets();
  },
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

.text {
  display: block;
  float: right;
  clear: both;
  text-align: right;
  padding-right: 10%;
}

@media only screen and (min-width: 768px) {
  .brnodisplay {
    display: none;
  }
}
</style>
