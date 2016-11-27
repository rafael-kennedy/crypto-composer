const Vue = require('vue/dist/vue.js')
const _ = require('lodash')
const cryptico = require('cryptico')
const remote = require('electron').remote

var cryptSettings = require('electron').remote.getGlobal('cryptSettings')

var app = new Vue({
  el: '#crypto',
  data: {
    cryptMode: cryptSettings.cryptMode,
    publicKey: cryptSettings.publicKey,
    privateKey: cryptSettings.privateKey,
    aes: cryptSettings.aes
  },
  methods: {
    modeSelect: function(e) {
      cryptSettings.cryptMode = e.target.value
    },
    generateAES: function() {
      this.aes = cryptSettings.aes = JSON.stringify(cryptico.generateAESKey())
    }
  }
})
