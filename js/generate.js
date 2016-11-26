// Required Modules
const Vue = require('vue/dist/vue.js')
const _ = require('lodash')
const cryptico = require('cryptico')
const remote = require('electron').remote

// Remote Globals
var cryptSettings = require('electron').remote.getGlobal('cryptSettings')

// Vue Components
var app = new Vue({
  el: '#generator',
  data: {
    bits: cryptSettings.bits,
    publicKey: cryptSettings.publicKey
  },
  methods: {
    passphrase: _.debounce(function (e) {
      var pp = cryptSettings.passphrase = e.target.value
      var RSAobj = cryptSettings.obj = cryptico.generateRSAKey(pp, this.bits)
      cryptSettings.publicKey = this.publicKey = cryptico.publicKeyString(RSAobj)
      cryptSettings.bits = this.bits
    }, 1000)
  }
})
