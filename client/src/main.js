import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://127.0.0.1:3070",
  timeout: 10000,
});

const app = createApp(App);
app.use(router);
app.config.globalProperties.$axios = axios;
app.mount("#app");
