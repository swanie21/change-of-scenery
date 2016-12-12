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
    <p class='photographer'>
      Photographer: {{ photographer }}
    </p>
    <p class='photographer-portfolio' @click='openPortfolioInBrowser'>
      {{ photographer }}'s portfolio: <span>{{ portfolio }}</span>
    </p>
    <p class='picture-url' @click='openPhotoInBrowser'>
      <span>Click here</span> to download image
    </p>
    <p class='search-term'>
      Search term: {{ searchTerm }}
    </p>
    <button class='close-info-button' @click='closeModal'>Close</button>
  </section>
</template>

<script>
  const path = require('path')
  const { remote } = require('electron')
  const mainProcess = remote.require(path.join(process.cwd(), 'app/electron.js'))
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
    },
    methods: {
      openPhotoInBrowser () {
        mainProcess.openInBrowser(this.photoUrl)
      },
      openPortfolioInBrowser () {
        mainProcess.openInBrowser(this.portfolio)
      }
    }
  }
</script>
