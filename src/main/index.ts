import { join } from 'node:path';
import { app, BrowserWindow, protocol, systemPreferences } from 'electron';
import { createIPCHandler } from 'electron-trpc/main';
import log from 'electron-log/';

import { Context, appRouter } from './trpc';

global.IS_DEV = process.env.NODE_ENV === 'development';

let mainWindow: BrowserWindow;

protocol.registerSchemesAsPrivileged([
  { scheme: 'http', privileges: { standard: true, bypassCSP: true, allowServiceWorkers: true, supportFetchAPI: true, corsEnabled: true, stream: true } },
  { scheme: 'https', privileges: { standard: true, bypassCSP: true, allowServiceWorkers: true, supportFetchAPI: true, corsEnabled: true, stream: true } },
  { scheme: 'mailto', privileges: { standard: true } },
]);


const exitApp = async () => {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.hide();
  }
  mainWindow.destroy();
  app.exit();
};

const createWindow = async () => {

  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
    },
  });

  mainWindow.setMenu(null);

  mainWindow.on('close', (event: Event): void => {
    event.preventDefault();
    exitApp();
  });

  mainWindow.webContents.on('did-frame-finish-load', (): void => {
    if (global.IS_DEV) {
      mainWindow.webContents.openDevTools();
    }
  });


  mainWindow.once('ready-to-show', (): void => {
    mainWindow.setAlwaysOnTop(true);
    mainWindow.show();
    mainWindow.focus();
    mainWindow.setAlwaysOnTop(false);
  });

  if (global.IS_DEV) {
    await mainWindow.loadURL('http://localhost:5173');
  } else {
    await mainWindow.loadFile(join(__dirname, '../index.html'));
  }

  // Initialize IPC Communication
  createIPCHandler({
    router: appRouter, windows: [mainWindow], async createContext(): Promise<Context> {
      return { window: mainWindow, app, log }
    },
  });
};
app.whenReady().then(async () => {
  if (process.platform === 'darwin') {
    systemPreferences.setUserDefault('NSDisabledDictationMenuItem', 'boolean', true);
    systemPreferences.setUserDefault('NSDisabledCharacterPaletteMenuItem', 'boolean', true);
  }

  createWindow();
});

app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
