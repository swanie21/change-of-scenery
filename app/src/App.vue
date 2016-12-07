<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
  }

  body {
    align-items: center;
    background-image: url('../../img/collage.png');
    display: flex;
    font-family: Lato, Helvetica, sans-serif;
    justify-content: center;
  }
</style>

<template>
  <div>
    <home-page></home-page>
  </div>
</template>

<script>
  import HomePage from './components/HomePage'
  export default {
    components: {
      HomePage
    }
  }
</script>
