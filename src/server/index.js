const {app, BrowserWindow} = require('electron');
let win;

app.once('ready', () => {
  win = new BrowserWindow({height: 400, width: 600});
  win.loadURL(`file://${__dirname}/../../public/index.html`);
  win.webContents.openDevTools();
});
