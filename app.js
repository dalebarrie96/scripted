const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { version: appVersion } = require("./package.json");
const { keyboard } = require("@nut-tree/nut-js");
const env = process.env.NODE_ENV || 'prod';

keyboard.config.autoDelayMs = 500;
  
// If development environment
if (env === 'dev') {
    try {
        require('electron-reloader')(module, {
            debug: true,
            watchRenderer: true
        });
    } catch (_) { console.log('Error'); }    
}

app.whenReady().then(() => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'main', 'mainPagePreload.js')
    },
    width: 800,
    height: 600,
    icon: path.join(__dirname, 'src', 'img', '/Scripted-Logo.png')
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

ipcMain.handle( 'app:changeTypingDelay', (event, newDelay) => {  
    keyboard.config.autoDelayMs = newDelay;
});

ipcMain.handle( 'app:runScript', (event, codeToPrint) => {
    console.log("inside handle")
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