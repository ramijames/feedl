const { contextBridge, ipcRenderer } = require('electron');

console.log('[Preload] Script loading...');

contextBridge.exposeInMainWorld('api', {
  addFeed: (link, title) => ipcRenderer.invoke('feed:add', { link, title })
});

console.log('[Preload] API exposed');