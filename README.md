# Cryptoser
[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
***


A simple markdown editor with HTML, and encrypted ciphertext output.

## Intro
This is a mostly just for fun piece of software, using:
- Node
- [Electron](https://github.com/electron/electron)
- [Marked.js](https://github.com/chjj/marked)
- [Vue.js](https://github.com/vuejs/vue)
- [cryptico.js](https://github.com/wwwtyro/cryptico)
- [photon](https://github.com/connors/photon)

The idea is to create a simple, easy to use, cross-platform desktop markdown editor, with baked-in cryptography, using RSA (I know this is silly) AES (I know this is also silly) and a hybrid cryptosystem using JSON, as a way both for me to learn about crypto, and to demonstrate that cryptography is surprisingly comprehensible once you sort of crack the seal on what you're doing.

## To Install
1. Clone or download.
1. npm install
1. electron .

## To use
The app currently only supports the admittedly goofy pure RSA encryption of short pieces of markdown. Text can be entered in the "plaintext" pane, and an HTML preview, encrypted output (ciphertext) and encrypted HTML appear in the other panes.

If you have a public key you would like to use, you can click the "cryptography settings" button, and paste it into the "public key" box in the resultant dialog.

## Generate RSA Key
If you would like to generate a RSA key using this tool, you can click "Generate Key" to open a dialog. Then choose a passphrase and enter it into the box. This will use the passphrase as a seed in a pseudorandom number generator. The resultant public key will be entered into the box below.
