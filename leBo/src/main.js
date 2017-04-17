// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.use( Vuex );

// vuex;
const store = new Vuex.Store({
		state : {
			loader : false,
      songId : []
		},
		mutations : {
			tog : function(state,loader){
				state.loader = loader;
			},
      SongAdd (state,song){
        state.songId = song;
      } 
		}
	})

// 拦截器;
Vue.http.interceptors.push((request, next)  =>{
  store.commit('tog',true);
  next((response) => {
  	store.commit('tog',false);
    return response;
  });
});

// 过滤器;
Vue.filter('six', function (value) {
 return (value/10000).toFixed(1)+'万';
})

// 自定义指令;
Vue.directive('stopNav', {
  bind: function (el) {
   function stop(){
    var elTop = el.offsetTop;
    var scrollTop = document.body.scrollTop;
    if( (scrollTop+elTop)>= elTop ){
      el.style['position'] = 'fixed';
      el.style['top'] = elTop+'px';
    }else{
      el.style['position'] = 'static';
    }
   }
   window.onscroll = function(){
    stop();
   }

   document.addEventListener('touchmove',function(){
      stop();
   }, false); 
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
