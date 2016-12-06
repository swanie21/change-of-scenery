<style lang="scss" scoped>

$main-color: #2bd22d;

.main-text {
  color: $main-color;
}

.search-input {
  font-size: 16px;
  margin-top: 15px;
  padding: 5px;
}

</style>

<template>
  <div>
    <h1 class="main-text">Change in Scenery</h1>
    <input class="search-input" v-model="search" placeholder="Search">
    <button class="submit-search-button" @click='saveToStorage'>Submit</button>
    <button @click='getOutOfStorage'>Retrieve</button>
    <p>{{ search }}</p>
    <p>{{ oldSearch }}</p>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      search: '',
      oldSearch: ''
    }
  },
  methods: {
    saveToStorage () {
      localStorage.setItem('searchTerm', JSON.stringify(this.search))
    },
    getOutOfStorage () {
      this.oldSearch = JSON.parse(localStorage.getItem('searchTerm'))
    }
  }
}
</script>
