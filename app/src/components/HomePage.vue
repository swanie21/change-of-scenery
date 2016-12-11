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

.modal-container {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
}

.error-message {
  font-size: 20px;
  color: white;
}
</style>

<template>
  <section class='search-container' v-on:keyup.27='closeModal'>
    <input class='search-input' v-model='search' v-on:keyup.13='previewBackground' type='text' placeholder='Find a background'>
    <button class='submit-search-button' @click='previewBackground'>Get Image</button>
      <h1 class='error-message'>
        {{ errorMessage }}
      </h1>
    <section class='modal-container' v-show='showModal'>
      <current-picture-info
        :closeModal='closeModal'>
      </current-picture-info>
    </section>
    <button class='submit-search-button' @click='openModal'>See Picture Info</button>
    <section class='modal-container' v-show='showPreviewModal'>
      <background-preview :previewBackground='previewBackground' :thumbUrl='thumbUrl' :saveBackground='saveBackground'></background-preview>
    </section>
  </section>
</template>

<script>
  import CurrentPictureInfo from './CurrentPictureInfo'
  import BackgroundPreview from './BackgroundPreview'
  const applescript = require('applescript')
  const axios = require('axios')
  const { remote } = require('electron')
  const path = require('path')
  const mainProcess = remote.require(path.join(process.cwd(), 'app/electron.js'))
  const downloadPath = path.join(process.cwd(), '/app', '/imageDownloads')
  const setCurrentPictureInLocalStorage = (pictureData, searchTerm) => {
    localStorage.setItem('currentPicture', JSON.stringify({
      searchTerm: searchTerm || 'random',
      photoUrl: pictureData.urls.full,
      photographer: pictureData.user.name,
      photographerWebsite: pictureData.user.portfolio_url
    }))
  }
  const showLoader = () => {
    document.querySelector('.background-preview').style.display = 'none'
    document.querySelector('.loader').style.display = 'block'
  }

  const hideLoader = () => {
    document.querySelector('.background-preview').style.display = 'block'
    document.querySelector('.loader').style.display = 'none'
  }

  let imageId

  export default {

    data () {
      return {
        search: '',
        errorMessage: '',
        thumbUrl: '',
        imageData: null,
        showModal: false,
        showPreviewModal: false
      }
    },

    components: {
      CurrentPictureInfo,
      BackgroundPreview
    },

    methods: {
      closeModal () {
        this.showModal = false
      },

      openModal () {
        this.showModal = true
      },

      closePreviewModal () {
        this.showPreviewModal = false
      },

      openPreviewModal () {
        this.showPreviewModal = true
      },

      previewBackground () {
        this.errorMessage = ''
        hideLoader()
        axios.get(`https://api.unsplash.com/photos/random?query=${this.search}&client_id=f3ff11ed9e9a4de213e05ff00fa5e4f503cdf0b595de8dfd2d59cad26f7efb3f`)
        .then((response) => {
          this.imageData = response.data
          this.thumbUrl = response.data.urls.thumb
          this.openPreviewModal()
        })
        .catch((error) => {
          this.errorMessage = 'No images match that search, sorry.'
          console.log(error)
        })
      },

      saveBackground () {
        showLoader()
        imageId = Date.now()
        mainProcess.savePicture(this.imageData, imageId)
        setCurrentPictureInLocalStorage(this.imageData, this.search)
        setTimeout(this.setBackground, 3000)
      },

      setBackground () {
        this.closePreviewModal()
        let script = `tell application "Finder" to set desktop picture to POSIX file  "${downloadPath}/background${imageId}.jpg"`
        applescript.execString(script, (error, response) => {
          if (error) {
            console.log(error)
          }
        })
        this.search = ''
      }
    }
  }

</script>
