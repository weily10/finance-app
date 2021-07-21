<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field label="search stocks" v-model="search"></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        {{stockName}}
      </v-col>
      <v-col>
        {{price}}
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

    </v-row>
    <v-row>
       <v-col>
       Dividend earned: {{dividend}} <br>
       You get {{dividendMonth}} per month
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import HelloWorld from '../components/HelloWorld'

export default {
  components: {},
  data() {
    return {
      shares: 0,
      stockName:'',
      price:'$'+0,
      dividend:0,
      dividendMonth:0
    };
  },
};
</script>
