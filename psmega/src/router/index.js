import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import VueMask from 'v-mask'

import Login from '../views/Login.vue'
import Users from '../views/Painel.vue'
import axios from 'axios';

function AdminAuth(to, from, next){
  if(localStorage.getItem('token') != undefined){

    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

    axios.post("http://localhost:8686/validate",{},req).then(res => {
      console.log(res);
      next();
    }).catch(err => {
      console.log(err.response);
      next('/sign-in');
    });
  }else{
    next('/sign-in');
  }
}

Vue.use(VueRouter)
Vue.use(VueMask)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/sign-in',
    name: 'Login Usuário',
    component: Login
  },
  {
    path: '/painel',
    name: 'Painel',
    component: Users,
    beforeEnter: AdminAuth
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
