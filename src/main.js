// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import axios from 'axios'
import Vuex from 'vuex'
import VueAMap from 'vue-amap';
import dtime from 'time-formater'
import global from './global/global.js'
import schedule from 'node-schedule'

Vue.config.productionTip = false

Vue.use(ElementUI)
// Vue.use(axios)
Vue.use(Vuex)
Vue.use(VueAMap);
Vue.prototype.$global = global
Vue.prototype.$dtime = dtime
Vue.prototype.$schedule = schedule
VueAMap.initAMapApiLoader({
  // 高德的key
  key: 'e0268e0680ae4032e44af0a21fb7c3a6',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
