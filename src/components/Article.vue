<template>
  <div class="article-view">
    <div class="article-close">
      <router-link to="/">
        Back
      </router-link>
    </div>
    <h2 class="article-headline"></h2>
    <p class="article-meta"></p>
    <div class="article-content" v-html="story">
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  name: 'article',
  data: function () {
    return {
      story: '<h2>test</h2>'
    }
  },
  created: function () {
    this.requestArticle(this.$route.params.id);
  },
  watch: {
    '$route'(to, from) {
      this.requestArticle(this.$route.params.id);
    }
  },
  methods: {
    requestArticle: function (id) {
      console.log(id);
      let self = this;
      // axios.get('/api/story'+id)
      // .then(function(story){
      //   self.story = story;
      // })
      // .catch(console.log(error));
      self.story = '<h2>I am some stories</h2>' + id;
    }
  }
}
</script>
<style>
.article-view {
  position: relative;
  max-width: 960px;
  margin: auto;
}

.article-close {
  position: absolute;
  top: 5%;
  right: 5%;
}
</style>

