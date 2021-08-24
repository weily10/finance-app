import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import appserve from "../src/api/appserver";

Vue.config.productionTip = false;

appserve.interceptors.request.use(
  config => {
    localStorage.setItem(
      "x-rapidapi-key",
      "c443088b61msh8caed034aacf628p17d611jsnb0d8e92e252e"
    );
    config.headers.common['x-rapidapi-key']='c443088b61msh8caed034aacf628p17d611jsnb0d8e92e252e';
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
