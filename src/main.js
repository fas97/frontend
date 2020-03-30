import Vue from "vue";
import App from "./App";
import router from "./router";
import Buefy from "buefy";
import "buefy/dist/buefy.css";
import axios from "axios";

Vue.use(Buefy);

Vue.prototype.$http = axios;

Vue.config.productionTip = false;

axios.defaults.baseURL = "https://localhost:44355";

new Vue({
  router,
  render: h => h(App),
  components: { App },
  template: "<App/>"
}).$mount("#app");
