import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import GeneralImport from "../views/General/Import.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/general/import",
    name: "GeneralImport",
    component: GeneralImport,
  },
  {
    path: "/general/compare",
    name: "GeneralPercent",
    component: () => import("../views/General/ComparePercent.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
