<template>
  <v-app>
    <v-app-bar app color="primary" dark absolute fixed>
      <v-app-bar-nav-icon @click="drawer = true" class="hidden-sm-and-up"></v-app-bar-nav-icon>
      FFreedomApp
        <v-tabs centered center-active v-model="tab"  v-show="$vuetify.breakpoint.smAndUp" >
          <v-tabs-slider color="white"></v-tabs-slider>

          <v-tab @click="$router.push({ name: 'Home' })">
            market
          </v-tab>
          <v-tab @click="$router.push({ name: 'freeCalculator' })">
            freedom calculator
          </v-tab>
        </v-tabs>
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push({ name: 'Home' })">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary  >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="$router.push({ name: 'Home' })">
            <v-list-item-icon>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-title>market</v-list-item-title>
          </v-list-item>

          <v-list-item
            @click="$router.push({ name: 'freeCalculator' })"
          >
            <v-list-item-icon>
              <v-icon>mdi-cash-100</v-icon>
            </v-list-item-icon>
            <v-list-item-title>freedom calculator</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container class="d-flex justify-center" fluid>
        <v-responsive max-width="960">
          <router-view />
        </v-responsive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    tab: null,
    value: false,
    drawer: false,
    group: null,
  }),
};
</script>
<style>

</style>
