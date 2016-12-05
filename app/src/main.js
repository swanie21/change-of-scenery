import Vue from 'vue'

Vue.config.debug = true

import App from './App'

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount('#app')
