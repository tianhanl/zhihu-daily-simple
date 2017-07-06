import Vue from 'vue';
import Router from 'vue-router';
import List from './components/List.vue';
import Article from './components/Article.vue';

// Use vue-router plugin
Vue.use(Router);

const router = new Router({
  routes: [{
    path: '/',
    name: 'list',
    component: List
  }, {
    path: '/article/:id',
    name: 'article',
    // The component can then use this.$route.params.id to access id
    component: Article
  }]
});

export default router;