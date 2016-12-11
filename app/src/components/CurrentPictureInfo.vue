<style lang='scss' scoped>
.current-picture-info {
    width: 300px;
    margin: 40px auto 0;
    padding: 20px 30px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
}
</style>


<template>
  <section class='current-picture-info'>
    <h2 class='photographer'>
      Photographer: {{ photographer }}
    </h2>
    <h2 class='photographer-portfolio'>
    </h2>
    <h2 class='picture-url'>
    </h2>
    <button class='closeModal' @click='closeModal'>Exit</button>
  </section>
</template>

<script>
const currentPicture = JSON.parse(localStorage.getItem('currentPicture'))
export default {
  props: ['closeModal'],
  data () {
    return {
      photographer: currentPicture ? currentPicture.photographer : null
    }
  }
}
</script>
