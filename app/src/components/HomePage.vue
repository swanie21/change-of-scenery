<style lang="scss" scoped>
.search-container {
  align-items: center;
  background: black;
  opacity: 0.9;
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: center;
  width: 100vw;
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
    <button class="submit-search-button" @click='getPicture'>Get Picture</button>
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
        search: ''
      }
    },

    methods: {
      getPicture () {
        imageId = Date.now()
        axios.get(`https://api.unsplash.com/photos/random?query=${this.search}&client_id=f3ff11ed9e9a4de213e05ff00fa5e4f503cdf0b595de8dfd2d59cad26f7efb3f`)
        .then((response) => {
          let pictureData = response.data
          mainProcess.savePicture(pictureData.urls.regular, imageId)
        })
        .then(() => {
          setTimeout(this.setBackground, 1000)
        })
        .catch((error) => {
          console.log(error)
        })
        this.search = ''
      },
      setBackground () {
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
