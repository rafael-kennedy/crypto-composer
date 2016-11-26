const Vue = require('vue/dist/vue.js')
const _ = require('lodash')
const cryptico = require('cryptico')
const remote = require('electron').remote

var cryptSettings = require('electron').remote.getGlobal('cryptSettings')

var app = new Vue({
  el: '#crypto',
  data: {
    publicKey: cryptSettings.publicKey,
    privateKey: cryptSettings.privateKey
  },
  methods: {
  }
})
