<style lang="scss" scoped>
.search-container {
  align-items: center;
  background: black;
  opacity: 0.85;
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: center;
  overflow-y: hidden;
  width: 800px;
}

.search-input {
  background: #fff;
  border-radius: 50px;
  color: #010101;
  font-size: 26px;
  outline: none;
  padding: 15px;
  text-align: center;
  width: 400px;
  &:focus {
    background: #edee9d;
    transition: 0.5s;
  }
}

.submit-search-button {
  background: #DD1C1A;
  border: none;
  border-radius: 25px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.50);
  color: #FFF1D0;
  font-size: 20px;
  margin-top: 15px;
  outline: none;
  padding: 5px;
  width: 100px;
  &:hover {
    background: darken(#DD1C1A, 15%);
    cursor: pointer;
  }
}
</style>

<template>
  <section class="search-container">
    <input class="search-input" v-model="search" type="text" placeholder="Find a background">
    <button class="submit-search-button">Submit</button>
  </section>
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
