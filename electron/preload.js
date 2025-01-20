const { contextBridge, ipcRenderer } = require('electron');

console.log('[Preload] Script loading...');

contextBridge.exposeInMainWorld('api', {
  addFeed: (feed) => ipcRenderer.invoke('feed:add', feed),
  getFeeds: () => ipcRenderer.invoke('feed:all'),
  deleteFeed: (id) => ipcRenderer.invoke('feed:delete', id),
  parseFeed: (feedUrl) => ipcRenderer.invoke('feed:parse', feedUrl),
});

console.log('[Preload] API exposed');