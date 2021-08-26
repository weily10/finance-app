<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      FFreedomApp
      <v-spacer></v-spacer>
      <v-btn icon @click="$router.push($router.push({ name: 'Home' }))">
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <!-- <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon> -->
    </v-app-bar>
    <!-- <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="$router.push($router.push({ name: 'Home' }))">
            <v-list-item-icon>
              <v-icon>mdi-chart-line</v-icon>
            </v-list-item-icon>
            <v-list-item-title>market</v-list-item-title>
          </v-list-item>

          <v-list-item @click="$router.push($router.push({ name: 'freeCalculator' }))">
            <v-list-item-icon>
              <v-icon>mdi-cash-100</v-icon>
            </v-list-item-icon>
            <v-list-item-title>freedom calculator</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer> -->
    <v-main>
      <router-view />
    </v-main>
    <v-bottom-navigation :value="value" color="primary">
      <v-btn icon @click="$router.push($router.push({ name: 'Home' }))">
        <span>market</span>

        <v-icon>mdi-chart-line</v-icon>
      </v-btn>

      <v-btn @click="$router.push($router.push({ name: 'freeCalculator' }))">
        <div>calculator</div>

        <v-icon>mdi-cash-100</v-icon>
      </v-btn>

      <!-- <v-btn>
      <span>freedom calculator</span>

      <v-icon>mdi-map-marker</v-icon>
    </v-btn> -->
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    drawer: false,
    group: null,
  }),
};
</script>
