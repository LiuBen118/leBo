import Vue from 'vue'
import Router from 'vue-router'
import Resource  from 'vue-resource'

Vue.use(Router);
Vue.use(Resource);

import home from '@/components/page/home'
import MusicList from '@/components/base/MusicList'
import play from '@/components/base/play'
import classify from '@/components/base/classify'
export default new Router({
  routes: [
  	{
  	  path: '/',
  	  redirect : '/home'
  	},
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/MusicList/:id',
      name: 'MusicList',
      component: MusicList
    },
    {
      path: '/play/:id',
      name: 'play',
      component: play
    },
    {
      path: '/classify/:id/:name',
      name: 'classify',
      component: classify
    }
  ]
})
