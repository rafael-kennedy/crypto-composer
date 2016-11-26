// Required Modules
const Vue = require('vue/dist/vue.js')
const marked = require('marked')
const _ = require('lodash')
const cryptico = require('cryptico')
const {BrowserWindow, dialog} = require('electron').remote
const fs = require('fs')
const remote = require('electron').remote

// Remote Globals
var cryptSettings = require('electron').remote.getGlobal('cryptSettings')

// Utility Methods
function decrypt (val) {
  var obj = cryptico.decrypt(val, cryptico.generateRSAKey(cryptSettings.passphrase, cryptSettings.bits))
  if (obj.status !== 'failure') {
    return obj.plaintext
  } else {
    console.error('decryption failure')
    return 'There was an error decrypting the text supplied.'
  }
}

// Vue components
var app = new Vue({
  el: '#app',
  data: {
    content: 'Hello This is text!'
  },
  computed: {
    output: function () {
      return marked(this.content, {sanitize: true})
    },
    cipherPlain: {
      get: function () {
        if (cryptSettings.publicKey) {
          return cryptico.encrypt(this.content, cryptSettings.publicKey).cipher
        } else {
          return 'There is not yet a valid Public Key.'
        }
      }
    },
    cipherHTML: {
      get: function () {
        if (cryptSettings.publicKey) {
          return cryptico.encrypt(this.output, cryptSettings.publicKey).cipher
        } else {
          return 'There is not yet a valid Public Key.'
        }
      },
      set: {
        function (newValue) {
          this.output = cryptico.decrypt(newValue, cryptSettings.obj)
        }
      }
    }
  },
  methods: {
    savePlain: function () {
      save(app.content)
    },
    saveHTML: function () {
      save(app.output)
    },
    saveCText: function () {
      save(app.cipherPlain)
    },
    saveCHTML: function () {
      save(app.cipherHTML)
    },
    update: _.debounce(function (e) {
      this.content = e.target.value
    }, 500),
    decrypt: _.debounce(function (e) {
      this.content = decrypt(e.target.value)
    }, 500)
  }
})

// Methods referenced in input elements

function save (data) {
  dialog.showSaveDialog({}, function (path) {
    fs.writeFile(path, data, function (err) {
      if (err) {
        console.log(err)
      }
    })
  })
}
