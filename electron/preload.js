const { contextBridge, ipcRenderer } = require('electron');

console.log('[Preload] Script loading...');

contextBridge.exposeInMainWorld('api', {
  addFeed: (link, title) => ipcRenderer.invoke('feed:add', { link, title }),
  getFeeds: () => ipcRenderer.invoke('feed:all'),
  deleteFeed: (id) => ipcRenderer.invoke('feed:delete', id),
});

console.log('[Preload] API exposed');