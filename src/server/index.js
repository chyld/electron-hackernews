const {app, BrowserWindow} = require('electron');
const ipc = require('electron').ipcMain
const request = require('request');
const Promise = require('bluebird');
let win;

app.once('ready', () => {
  win = new BrowserWindow({height: 400, width: 600});
  win.loadURL(`file://${__dirname}/../../public/index.html`);
});

ipc.on('top', (event, data) => {
  get().then(stories => event.sender.send('top', stories));
});

async function get(){
  const ids = await Request('https://hacker-news.firebaseio.com/v0/topstories.json');
  const links = Array(10).fill(null).map((_, i) => Request(`https://hacker-news.firebaseio.com/v0/item/${ids[i]}.json`));
  return await Promise.all(links);
}

function Request(url){
  return new Promise((resolve, reject) => {
    request(url, {json: true}, (err, rsp, body) => {
      resolve(body);
    });
  });
}
