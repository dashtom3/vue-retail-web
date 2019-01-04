import Vue from 'vue'

import Router from 'vue-router'
import Layout from '@/components/layout/Layout'
import Main from '@/components/Main'
import Detail from '@/components/admin/Detail'
import CameraPage from '@/components/admin/CameraPage'
import HotData from '@/components/admin/HotData'
import peopleAnalyse from '@/components/admin/peopleAnalyse'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path:'/cameraPage',
      component: CameraPage,
      name:'CameraPage'
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Layout,
      children:[
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
        }
        
      ]
    }
  ]
})
