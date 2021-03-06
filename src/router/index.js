import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import freeCalculator from "../views/FreeCalculator.vue";


Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/freeCalculator',
    name: 'freeCalculator',
    component: freeCalculator

  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
