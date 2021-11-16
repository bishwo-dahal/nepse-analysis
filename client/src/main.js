import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import Axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueSweetAlert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
library.add(fas);

let app = createApp(App);
app.use(router);
app.use(VueSweetAlert2, {
  allowOutsideClick: false,
});
app.component("fa", FontAwesomeIcon);
app.config.globalProperties.$axios = Axios.create({
  baseURL: "http://localhost:3070",
});
app.mount("#app");
