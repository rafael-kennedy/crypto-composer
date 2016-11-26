var btn = {
  generate: function generate () {
    global.genWin = new BrowserWindow({width: 800, height: 600})
    genWin.loadURL(`file://${__dirname}/generate.html`)
  },
  crypto: function crypto () {
    global.crWin = new BrowserWindow({width: 800, height: 600})
    crWin.loadURL(`file://${__dirname}/crypto.html`)
  }
}
