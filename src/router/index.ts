import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
 


const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path:"/login",
        name: "Login",
        component: Login,
    }
    
    
]


const history = createWebHistory();
const router = createRouter({
    history,
    routes
})

 

export default router