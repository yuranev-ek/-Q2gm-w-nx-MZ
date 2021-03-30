import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueMask from "v-mask";
import "./assets/css/tailwind.css";

Vue.use(VueMask);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
