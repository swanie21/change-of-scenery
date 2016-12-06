<style lang="scss" scoped>

$main-color: #2bd22d;

.main-text {
  color: $main-color;
}
</style>

<template>
  <div>
    <h1 class="main-text">Change in Scenery</h1>
    <input v-model="search" placeholder="Search">
    <button class="submit-search-button">Submit</button>
    <p>{{ search }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      search: ''
    }
  }
}
</script>
