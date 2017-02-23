// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
//import Plugins from './plugins'
import routes from './js/routes'



Vue.use(VueRouter)


const router = new VueRouter({routes})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<router-view></router-view>',
  router,
  //components: { App }
})
