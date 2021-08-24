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
                <v-btn color="blue" dark depressed block @click="addData()">ok</v-btn>
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
      <div>
      <div align="center">no data</div>
      <div align="center">
        <v-btn color="blue" depressed dark @click="dialog1 = true">add</v-btn>
      </div>
      </div>
    </v-list>
  </v-container>
</template>

<script>
export default {
  components: {},
  data() {
    return {
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
  methods:{
    addData(){
      this.dialog1=false
    }
  },

  mounted() {},
};
</script>