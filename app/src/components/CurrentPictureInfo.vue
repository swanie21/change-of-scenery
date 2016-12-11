<style lang='scss' scoped>
.current-picture-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: white;
    height: 300px;
    width: 300px;
    margin: 40px auto 0;
    padding: 20px 30px;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    transition: all .3s ease;
    background-color: grey;
}
.close-modal-button {
  background: #DD1C1A;
  border: none;
  border-radius: 25px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.50);
  color: #FFF1D0;
  font-size: 20px;
  margin-top: 15px;
  margin: auto;
  outline: none;
  padding: 10px;
  width: 120px;
  &:hover {
    background: darken(#DD1C1A, 15%);
    cursor: pointer;
    transition: 0.4s;
  }
}
</style>


<template>
  <section class='current-picture-info'>
    <h2 class='photographer'>
      Photographer: {{ photographer }}
    </h2>
    <h2 class='photographer-portfolio'>
      <a :href='portfolio'>{{ photographer }}'s portfolio: {{ portfolio }}</a>
    </h2>
    <h2 class='picture-url'>
      <a :href='photoUrl'>Click here to see more about this photo.</a>
    </h2>
    <h3 class='search-term'>
      Search term: {{ searchTerm }}
    </h3>
    <button class='close-modal-button' @click='closeModal'>Exit</button>
  </section>
</template>

<script>
const currentPicture = JSON.parse(localStorage.getItem('currentPicture'))
export default {
  props: ['closeModal'],
  data () {
    return {
      photographer: currentPicture ? currentPicture.photographer : 'No picture yet',
      portfolio: currentPicture ? currentPicture.photographerWebsite : null,
      searchTerm: currentPicture ? currentPicture.searchTerm : null,
      photoUrl: currentPicture ? currentPicture.photoUrl : null
    }
  }
}
</script>
