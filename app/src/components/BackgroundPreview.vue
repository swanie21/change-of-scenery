<style lang="scss" scoped>

$button-color: #DD1C1A;
$button-text: #FFF1D0;

@mixin button-hover {
  background: darken($button-color, 15%);
  cursor: pointer;
  transition: 0.4s;
}

.preview-container {
  align-items: center;
  background: #000;
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: center;
  width: 100vw;
}

.background-preview {
  background-repeat: no-repeat;
  height: 130px;
  width: 200px;
}

.set-background-button,
.get-new-background-button {
  background: $button-color;
  border: none;
  border-radius: 25px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.50);
  color: $button-text;
  font-size: 16px;
  margin: 15px 5px 0 5px;
  outline: none;
  padding: 10px;
  width: 140px;
  &:hover {
    @include button-hover;
  }
}

.button-container {
  display: flex;
  flex-direction: row;
}

.loader {
  animation: spin 2s linear infinite;
  border: 12px solid #f3f3f3;
  border-radius: 50%;
  border-top: 12px solid $button-color;
  display: none;
  margin: 43px 0;
  height: 20px;
  width: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.close-preview-button {
  background: $button-color;
  border: none;
  border-radius: 50%;
  color: $button-text;
  font-size: 18px;
  height: 25px;
  position: absolute;
  right: 20px;
  top: 210px;
  width: 25px;
  &:hover {
    @include button-hover;
  }
}
</style>

<template lang='html'>
  <section class='preview-container'>
    <article class='background-preview' :style="{ 'backgroundImage': 'url(' + thumbUrl + ')' }"></article>
    <article class='loader'></article>
    <section class='button-container'>
      <button class='set-background-button' @click='saveBackground'>Set Background</button>
      <button class='get-new-background-button' @click='previewBackground'>Grab Another</button>
    </section>
    <button class='close-preview-button' @click='closePreviewModal'>X</button>
  </section>
</template>

<script>
export default {
  props: ['thumbUrl', 'previewBackground', 'saveBackground', 'closePreviewModal']
}
</script>
