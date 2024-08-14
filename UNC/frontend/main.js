const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const axios = require('axios');

function createWindow() {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.on('file-upload', async (event, file) => {
  try {
    console.log("start")
    await axios.post('http://localhost:3000/upload', file, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log("end")
    event.reply('file-upload-success');
  } catch (error) {
    event.reply('file-upload-failed', error);
  }
});
