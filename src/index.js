const { app, BrowserWindow, dialog } = require('electron');
const gameUrl = 'http://beta.forge.lillious.com';

async function init() {
  try {
    const response = await fetch(gameUrl, {
      signal: AbortSignal.timeout(2000),
    });
    if (!response.ok) {
      console.error('Failed to fetch the game URL:', response.statusText);
      dialog.showErrorBox('Error', 'Failed to connect to the game server. Please try again later.');
      app.quit();
      return;
    }
  } catch (error) {
    dialog.showErrorBox('Error', 'Failed to connect to the game server. Please try again later.');
    app.quit();
    return;
  }

  const createWindow = () => {
    const win = new BrowserWindow({
      center: true,
      movable: true,
      darkTheme: true,
      width: 1600,
      height: 1000,
      minWidth: 1600,
      minHeight: 1000,
      autoHideMenuBar: true,
      title: "Frostfire Forge Client"
    });

    win.loadURL(gameUrl);
  };

  app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
  });

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}

init();