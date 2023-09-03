import { App, BrowserWindow } from 'electron';
import { type ElectronLog } from 'electron-log';


export type Context = { window: BrowserWindow, app: App, log: ElectronLog };
