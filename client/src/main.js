import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import Axios from "axios";

let app = createApp(App);
app.use(router);
app.config.globalProperties.$axios = Axios.create({
  baseURL: "http:/127.0.0.1/3070",
});
app.mount("#app");
