<template>
  <div class="list-view">
    <h3>Today's Stories</h3>
    <ul>
      <li class="list-item" v-for="story in stories" v-bind:key="story.id">
        <router-link :to="{name:'article',params:{id:story.id}}">{{story.title}}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'list',
  data: () => {
    return {
      stories: [{
        id: '100',
        title: 'test'
      }]

    }

  }
}
</script>


