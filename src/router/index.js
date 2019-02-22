import Vue from 'vue'

import Router from 'vue-router'
import Layout from '@/components/layout/Layout'
import Main from '@/components/Main'
import Detail from '@/components/admin/Detail'
import CameraPage from '@/components/admin/CameraPage'
import HotData from '@/components/admin/HotData'
import peopleAnalyse from '@/components/admin/peopleAnalyse'

import ConfigSubshop from '@/components/user/ConfigSubshop'
import ConfigDevice from '@/components/user/ConfigDevice'
import DataScreen from '@/components/user/DataScreen'
import StoreRLData from '@/components/user/StoreRLData'
import StoreDLData from '@/components/user/StoreDLData'
import StoreRQData from '@/components/user/StoreRQData'
import ExportPage from '@/components/user/ExportPage'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout
    },
    {
      path:'/cameraPage',
      component: CameraPage,
      name:'CameraPage'
    },
    {
      path:'/hotdata',
      component: HotData,
      name:'HotData'
    },
    {
      path:'/peopleanalyse',
      component: peopleAnalyse,
      name:'peopleAnalyse'
    },
    {
      path:'/detail',
      component: Detail,
      name:'Detail'
    },
    {
      path: '/user',
      name: 'User',
      component: Layout,
      children:[
        {
          path:'/user/configSubshop',
          component: ConfigSubshop,
          name:'ConfigSubshop'
        },
        {
          path:'/user/configDevice',
          component: ConfigDevice,
          name:'ConfigDevice'
        },
        {
          path:'/user/dataScreen',
          component: DataScreen,
          name:'DataScreen'
        },
        {
          path:'/user/storeRLData',
          component: StoreRLData,
          name:'StoreRLData'
        },
        {
          path:'/user/storeDLData',
          component: StoreDLData,
          name:'StoreDLData'
        },
        {
          path:'/user/storeRQData',
          component: StoreRQData,
          name:'StoreRQData'
        },
        {
          path:'/user/exportPage',
          component: ExportPage,
          name:'ExportPage'
        },
      ]
    }
  ]
})
