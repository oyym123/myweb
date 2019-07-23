import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import HelloWorld from '@/components/HelloWorld'
import Load from '@/components/Load'
import PullUpReload from '@/components/PullUpReload'
import DropDownRefresh from '@/components/DropDownRefresh'
import Upload from '@/components/Upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/index',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/load',
      name: 'Load',
      component: Load, PullUpReload, DropDownRefresh
    },
        {
      path: '/Upload',
      name: 'Upload',
      component: Upload
    },
  ]
})
