<style lang="scss" scoped>
.preview-container {
  align-items: center;
  background: #000;
  display: flex;
  flex-direction: column;
  height: 300px;
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
  background: #DD1C1A;
  border: none;
  border-radius: 25px;
  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.50);
  color: #FFF1D0;
  font-size: 20px;
  margin: 15px 5px 0 5px;
  outline: none;
  padding: 10px;
  width: 170px;
  &:hover {
    background: darken(#DD1C1A, 15%);
    cursor: pointer;
    transition: 0.4s;
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
</style>

<template lang='html'>
 <section class='preview-container'>
   <article class='background-preview' :style="{ 'backgroundImage': 'url(' + thumbUrl + ')' }"></article>
   <article class='loader'></article>
   <section class='button-container'>
     <button class='set-background-button' @click='saveBackground'>Set Background</button>
     <button class='get-new-background-button' @click='previewBackground'>Grab Another Background</button>
   </section>
 </section>
</template>

<script>
export default {
  props: ['thumbUrl', 'previewBackground', 'saveBackground']
}
</script>
