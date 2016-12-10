<style lang='scss' scoped>
.search-container {
  align-items: center;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: center;
  width: 100vw;
}

.search-input {
  background: #fff;
  border: none;
  border-radius: 50px;
  box-shadow: inset 0 0 10px #000000;
  color: #010101;
  font-size: 26px;
  outline: none;
  padding: 15px;
  text-align: center;
  width: 400px;
  &:focus {
    background: #d0d2d6;
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
  padding: 10px;
  width: 120px;
  &:hover {
    background: darken(#DD1C1A, 15%);
    cursor: pointer;
    transition: 0.4s;
  }
}

.loader {
  animation: spin 2s linear infinite;
  border: 12px solid #f3f3f3;
  border-radius: 50%;
  border-top: 12px solid #DD1C1A;
  display: none;
  margin-top: 15px;
  height: 20px;
  width: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.background-preview {
  background-repeat: no-repeat;
  height: 130px;
  width: 200px;
}
</style>

<template lang='html'>
  <section class='search-container'>
    <input class='search-input' v-model='search' v-on:keyup.13='getPicture' type='text' placeholder='Find a background'>
    <button class='submit-search-button' @click='getPicture'>Get Image</button>
    <article class='loader'></article>
    <article class='preview-container'>
      <article class='background-preview' :style="{ 'backgroundImage': 'url(' + url + ')' }"></article>
      <div class='button-container'>
        <button class='set-background-button'>Set Background</button>
        <button class='get-new-background-button'>New Background</button>
      </div>
    </article>
  </section>
</template>

<script>
  const applescript = require('applescript')
  const axios = require('axios')
  const { remote } = require('electron')
  const path = require('path')
  const mainProcess = remote.require(path.join(process.cwd(), 'app/electron.js'))
  let downloadPath = path.join(process.cwd(), '/app', '/imageDownloads')
  let imageId

  export default {
    data () {
      return {
        search: '',
        url: ''
      }
    },
    methods: {
      getPicture () {
        imageId = Date.now()
        axios.get(`https://api.unsplash.com/photos/random?query=${this.search}&client_id=f3ff11ed9e9a4de213e05ff00fa5e4f503cdf0b595de8dfd2d59cad26f7efb3f`)
        .then((response) => {
          let pictureData = response.data
          mainProcess.savePicture(pictureData.urls.regular, imageId)
          document.querySelector('.submit-search-button').style.display = 'none'
          document.querySelector('.loader').style.display = 'block'
          this.url = response.data.urls.thumb
        })
        .then(() => {
          setTimeout(this.setBackground, 1000)
        }).catch((error) => {
          console.log(error)
        })
        this.search = ''
      },
      setBackground () {
        document.querySelector('.loader').style.display = 'none'
        document.querySelector('.submit-search-button').style.display = 'block'
        let script = `tell application "Finder" to set desktop picture to POSIX file  "${downloadPath}/background${imageId}.jpg"`
        applescript.execString(script, (error, response) => {
          if (error) {
            console.log(error)
          }
        })
      }
    }
  }
</script>
