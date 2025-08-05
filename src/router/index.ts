import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
];

const history = createWebHistory();
const router = createRouter({
  history,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token"); // Or use Vuex, Pinia, etc.

  if (to.meta.requiresAuth && !token) {
    next({ name: "Login" }); // Redirect to login if not authenticated
  } else {
    next(); // Proceed normally
  }
});

export default router;
