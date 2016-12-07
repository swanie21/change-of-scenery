<style lang="scss" scoped>
.search-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow-y: hidden;
}

.search-input {
  background: #fff;
  border: 2px solid darken(#FFF1D0, 10%);
  border-radius: 50px;
  color: #063545;
  font-size: 26px;
  outline: none;
  padding: 15px;
  text-align: center;
  width: 400px;
  &:focus {
    background: darken(#fff, 5%);
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
