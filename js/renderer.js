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
  var mode = cryptSettings.cryptMode

  function decryptRSA (val) {
    var obj = cryptico.decrypt(val, cryptico.generateRSAKey(cryptSettings.passphrase, cryptSettings.bits))
    if (obj.status !== 'failure') {
      return obj.plaintext
    } else {
      console.error('decryption failure')
      return 'There was an error decrypting the text supplied.'
    }
  }

  function decryptAES (val, key = JSON.parse(cryptSettings.aes)) {
    return cryptico.decryptAESCBC(val, key)
  }

  function decryptHybrid (val) {
    var obj = JSON.parse(val)
    var aes = JSON.parse(decryptRSA(obj.cipherKey))
    return decryptAES(obj.ciphertext, aes)
  }

  switch (mode) {
    case 'rsa':
      return decryptRSA(val)
      break
    case 'aes':
      return decryptAES(val)
      break
    case 'hybrid':
      return decryptHybrid(val)
      break
    default:
      return 'There was an error encrypting the provided text.'
  }
}

function encrypt (val) {
  var mode = cryptSettings.cryptMode

  function encryptRSA (val) {
    if (cryptSettings.passphrase && cryptSettings.bits && cryptSettings.publicKey) {
      return cryptico.encrypt(val, cryptSettings.publicKey, cryptico.generateRSAKey(cryptSettings.passphrase, cryptSettings.bits)).cipher
    } else if (cryptSettings.publicKey) {
      return cryptico.encrypt(val, cryptSettings.publicKey)
    } else return 'There is not yet a public Key.'
  }

  function encryptAES (val) {
    if (cryptSettings.aes) {
      return cryptico.encryptAESCBC(val, JSON.parse(cryptSettings.aes))
    } else return 'There is not yet an AES key'
  }

  function encryptHybrid () {
    if (cryptSettings.passphrase && cryptSettings.bits && cryptSettings.aes) {
      var obj = {
        cipherKey: encryptRSA(cryptSettings.aes),
        ciphertext: encryptAES(val)
      }
      return JSON.stringify(obj)
    }
  }

  switch (mode) {
    case 'rsa':
      return encryptRSA(val)
      break
    case 'aes':
      return encryptAES(val)
      break
    case 'hybrid':
      return encryptHybrid(val)
      break
    default:
      return 'There was an error encrypting the provided text.'
  }
}

// Vue components
var app = new Vue({
  el: '#app',
  data: {
    content: 'Hello This is text!',
    view: {
      fourPanel: true,
      md: false,
      editorOnly: false
    }
  },
  computed: {
    output: function () {
      return marked(this.content, {sanitize: true})
    },
    cipherPlain: {
      get: function () {
        return encrypt(this.content)
      }
    },
    cipherHTML: {
      get: function () {
        return encrypt(this.output)
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
    saveSettings: function () {
      save(JSON.stringify(cryptSettings))
    },
    update: _.debounce(function (e) {
      this.content = e.target.value
    }, 500),
    editorOnlyUpdate: _.debounce(function (e) {
      this.content = e.target.value
    }, 1000),
    decrypt: _.debounce(function (e) {
      this.content = decrypt(e.target.value)
    }, 500),
    openFile: function openFile (mode) {

      function load (path) {
        fs.readFile(path[0], 'utf8', (err, data) => {
          var out
          if (err) throw err

          switch (mode) {
            case "plain":
              app.content = data
              break;
            case "cText":
              app.content = decrypt(data)
              break;
            case "settings":
              cryptSettings = JSON.parse(data)
              break;
            default:

          }
        })
      }

      dialog.showOpenDialog(load)
    },
    viewButton: function(inStr){
      for (var view in this.view) {
        if (this.view.hasOwnProperty(view)) {
          this.view[view] = view === inStr
        }
      }
    }

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
