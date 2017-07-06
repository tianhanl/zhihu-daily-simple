import Vue from 'vue';
import App from './App.vue';
import router from './router';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app'); // use $mount when using vue-router

