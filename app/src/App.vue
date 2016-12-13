<template>
  <section>
    <home-page></home-page>
  </section>
</template>

<script>
  import HomePage from './components/HomePage'
  export default {
    components: {
      HomePage
    }
  }
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:700);

  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
  }

  body {
    align-items: center;
    background-image: url('../../img/photo-collage.jpg');
    display: flex;
    font-family: Lato, sans-serif;
    justify-content: center;
  }
</style>
