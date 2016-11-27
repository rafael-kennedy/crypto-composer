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

The idea is to create a simple, easy to use, cross-platform desktop markdown editor with baked-in cryptography, using pure RSA, pure AES, or a hybrid cryptosystem using JSON.

## To Install
1. Clone or download.
1. npm install
1. electron .

or

find compiled executables available here in the near future.

## To use
The default view has four panes. Text is entered into the top-left pane. As you type, the markdown preview pane is automatically updated.

Like all cryptography systems, this is not 100% secure. There are many vulnerabilities.

[![xkcd comic about cryptography](https://imgs.xkcd.com/comics/security.png)](https://xkcd.com/538/)

### Encryption modes
This software has 3 encryption modes. You can switch between them by using the "mode" selector in the cryptography settings dialog (accessible by clicking the lock icon in the toolbar):

#### RSA Only Mode
Use this mode if you only have a short message to encrypt, and you need to use asymmetric encryption. This means, when someone provides you with a public key for encryption, or when you wish to provide someone with a public key so that they can send you an encrypted message.

This public key can be safely shared, because in order to decrypt a message encrypted using it, you need to have a private key, that is not public.

In this case, the key is created using a seeded pseudorandom number generator and a passphrase. To create a new key pair, click the key button in the top toolbar. Then, in the passphrase field, enter a unique passphrase (this can be any sequence of characters) and a public key will be displayed in the box below. Copy this and post it for others to send you messages.

Save this passphrase, either by clicking the "Save Crypto Settings" button to save it as an importable text file, or by simply recording that passphrase.

#### AES Only Mode
AES Only Mode is useful if you have a long message to encrypt, and don't need the convenience of asymmetric encryption. If it will only be you decrypting this text, AES Only Mode is fine.

To use this mode, select it in the cryptography settings pane. Then, either generate a new AES Key by pressing the generate button, or enter an existing AES Key (in the form of [256, 256. .. 256]) into the box. Currently, this needs a length of 32 numbers.

#### Hybrid Mode
This is the most flexible method. This uses asymmetric RSA to encrypt an AES key, that is in turn used to decode the actual message. This is often the best method to use for longer messages. In order to use this method, you will need to both generate an RSA Key using the instructions above, and generate an AES Key using the instructions above. Then select "hybrid mode" from the cryptography settings pane.

The output in this mode will be a JSON string, with a cipher key item and a ciphertext item.

## Generate RSA Key
If you would like to generate a RSA key using this tool, you can click "Generate Key" to open a dialog. Then choose a passphrase and enter it into the box. This will use the passphrase as a seed in a pseudorandom number generator. The resultant public key will be entered into the box below.
