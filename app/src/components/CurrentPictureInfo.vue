<style lang='scss' scoped>
  .current-picture-info {
    background-color: #534a4a;
    border-radius: 5px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    color: lighten(#FFF1D0, 5%);
    display: flex;
    flex-direction: column;
    height: 300px;
    justify-content: center;
    padding: 30px;
    width: 400px;
  }

  .close-info-button {
    background: #DD1C1A;
    border: none;
    border-radius: 25px;
    box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.50);
    color: #FFF1D0;
    font-size: 16px;
    margin: auto;
    outline: none;
    padding: 6px;
    width: 80px;
    &:hover {
      background: darken(#DD1C1A, 15%);
      cursor: pointer;
      transition: 0.4s;
    }
  }

  p {
    font-size: 20px;
    margin: 15px 0;
    overflow-wrap: break-word;
    word-wrap: break-word;
  }

  span {
    color: #bfbaa6;
    &:hover {
      cursor: pointer;
    }
  }
</style>

<template>
  <section class='current-picture-info'>
    <p>Photographer: {{ currentImage.photographer }}</p>
    <p @click='openPortfolioInBrowser'>Portfolio: <span>{{ currentImage.photographerWebsite }}</span></p>
    <p @click='openPhotoInBrowser'>Unsplash link: <span>{{ currentImage.photoUrl }}</span></p>
    <p>Search term: {{ currentImage.searchTerm }}</p>
    <button class='close-info-button' @click='closePhotoInfoModal'>Close</button>
  </section>
</template>

<script>
  const path = require('path')
  const { remote } = require('electron')
  const mainProcess = remote.require(path.join(process.cwd(), 'app/electron.js'))

  export default {
    props: ['closePhotoInfoModal', 'currentImage'],
    methods: {
      openPhotoInBrowser () {
        mainProcess.openInBrowser(this.currentImage.photoUrl)
      },
      openPortfolioInBrowser () {
        mainProcess.openInBrowser(this.currentImage.photographerWebsite)
      }
    }
  }
</script>
