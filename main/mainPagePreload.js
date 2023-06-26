const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('application', {
    getVersion: () => ipcRenderer.invoke('getApplicationVersion')
});
