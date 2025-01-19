const { contextBridge, ipcRenderer } = require('electron');

console.log('[Preload] Script loading...');

contextBridge.exposeInMainWorld('api', {
  addFeed: (link, title) => ipcRenderer.invoke('feed:add', { link, title }),
  getFeeds: () => ipcRenderer.invoke('feed:all')
});

console.log('[Preload] API exposed');