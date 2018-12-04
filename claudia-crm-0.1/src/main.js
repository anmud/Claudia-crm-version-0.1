import Vue from 'vue'
import ClaudiaCRM from './ClaudiaCRM.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'; 
import axios from 'axios';

import {routes} from './router/routes.js';
import {store} from './store/store.js'



Vue.use (VueRouter);
Vue.use (VueResource);


axios.defaults.baseURL = 'https://claudiacrm-3c1a9.firebaseio.com'
//axios.defaults.headers.common['Authorization'] = 'fasfdsa'


const router = new VueRouter({
  routes,
  mode: 'history'
})




new Vue({
  el: '#app',
  store,
  router,
  //provide: apolloProvider.provide(),
  render: h => h(ClaudiaCRM)
})
