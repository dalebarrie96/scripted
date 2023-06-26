const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { version: appVersion } = require("./package.json");

app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'main', 'mainPagePreload.js')
    },
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'img', '/Scripted-Logo.png')
  });
  win.loadFile(path.join(__dirname, 'main', 'mainPage.html'));

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        //TODO: Create new Main window for mac users
    } 
  })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

ipcMain.handle('getApplicationVersion', () => appVersion);