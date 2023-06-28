const { BrowserWindow } = require('electron')

const startCountdownProcess = () => {
  return new Promise((resolve, reject) => {
    try {
      const timer = new BrowserWindow({
        width: 200,
        height: 150,
        alwaysOnTop: true,
        autoHideMenuBar: true
      })

      timer.loadFile('./countdown/countdown.html')

      timer.on('closed', () => {
        resolve()
      })
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = { startCountdownProcess }
