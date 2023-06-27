const { app, BrowserWindow, ipcMain } = require('electron');
const { createWindow } = require('./wrappers/ScriptedElectronWrapper');
const path = require('path');
const { version: appVersion } = require("./package.json");
const { keyboard } = require("@nut-tree/nut-js");
const env = process.env.NODE_ENV || 'prod';

keyboard.config.autoDelayMs = 500;

if (env === 'dev') {
  try {
    require('electron-reloader')(module, {
      debug: true,
      watchRenderer: true
    });
  } catch (_) { console.log('Error'); }
}

app.whenReady().then(() => {
  const mainPageGUI = path.join(__dirname, 'main', 'mainPage.html');
  const mainPagePreload = path.join(__dirname, 'main', 'mainPagePreload.js');

  let mainPageWindow = createWindow(mainPageGUI, mainPagePreload);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      mainPageWindow = createWindow(mainPageGUI, mainPagePreload);
    }
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});

ipcMain.handle('getApplicationVersion', () => appVersion);

ipcMain.handle('app:changeTypingDelay', (event, newDelay) => {
  keyboard.config.autoDelayMs = newDelay;
});

ipcMain.handle('app:runScript', (event, codeToPrint) => {
  const timer = new BrowserWindow({
    width: 200,
    height: 150,
    alwaysOnTop: true,
    autoHideMenuBar: true
  })

  timer.loadFile('./countdown/countdown.html');

  timer.on('closed', () => {
    keyboard.type(codeToPrint);
  });

});