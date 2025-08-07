import { createRouter, createWebHistory } from "vue-router";
import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import axios from "axios";
import { useUserStore } from "../store/index"

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

router.beforeEach(async (to, from, next) => {
  const token = sessionStorage.getItem("token");
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = `${baseUrl}/api/me`;
  const userStore = useUserStore();

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.get(url);
      console.log(res);
      
      userStore.setUser(res.data)
      next()
    } catch (error) {
      console.error("Invalid or expired token:", error);
      sessionStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      userStore.clearUser();
      next({ name: "Login" });
    }
  } else {
    delete axios.defaults.headers.common["Authorization"];
    userStore.clearUser();
    if (to.meta.requiresAuth) {
      next({ name: "Login" });
    } else {
      next();
    }
  }

});

export default router;
