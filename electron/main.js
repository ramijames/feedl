import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import sequelize from './database.js';
import Feed from './models/Feed.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

let mainWindow

app.on('ready', async () => {

  console.log('show me:', __dirname, __filename);

  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
  } catch (error) {
    console.error(error);
  }

  console.log('Database and models synced');

  mainWindow = new BrowserWindow({
    width: 1180,
    height: 920,
    transparent: true,
    backgroundColor: '#00000000',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
    frame: false,
    titleBarStyle: 'hidden',
    vibrancy: 'under-window',
    visualEffectState: 'active',
  });

  console.log(mainWindow)

  // During development, load the Nuxt dev server
  mainWindow.loadURL('http://localhost:3000');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    // Recreate window if closed on macOS
    createWindow();
  }
});

ipcMain.handle('feed:add', async (event, { 
  title,
  link,
  description,
  language,
  image,
  lastBuildDate,
  items,
  itunes
 }) => {
  return await Feed.create({ 
    title,
    link,
    description,
    language,
    image,
    lastBuildDate,
    items,
    itunes
   })
});

ipcMain.handle('feed:all', async (event) => {
  return await Feed.findAll();
});

ipcMain.handle('feed:get', async (event, id) => {
  return await Feed.findByPk(id);
});

ipcMain.handle('feed:delete', async (event, id) => {
  return await Feed.destroy({ where: { id } });
});

ipcMain.handle('feed:parse', async (event, feedUrl) => {
  console.log('parsing feed:', feedUrl);
  return await Feed.parse(feedUrl);
});