const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('application', {
    getVersion: () => ipcRenderer.invoke('getApplicationVersion')
});

contextBridge.exposeInMainWorld('config', {
    typingDelay: 500
});

contextBridge.exposeInMainWorld('electronTunnel', {
    runScript: (codeToPrint) => {
        ipcRenderer.invoke('app:runScript', codeToPrint)
    },
    changeTypingDelay: (newDelay) => {
        ipcRenderer.invoke('app:changeTypingDelay', newDelay)
    }
});
