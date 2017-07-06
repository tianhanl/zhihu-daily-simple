<template>
  <div class="article-view">
    <h2 class="article-headline"></h2>
    <p class="article-meta"></p>
    <div class="article-content">
      {{$route.params.id}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'article',
  watch: {
    '$route'(to, from) {
    }
  }
}
</script>
