'use strict';
const electron = require('electron');
const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, shell } = electron;
const request = require('request');

let mainWindow;
let config = {};

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    title: 'Change of Scenery',
    height: 600,
    minHeight: 600,
    width: 800,
    minWidth: 500,
    show: false
  });

  mainWindow.loadURL(config.url);

  mainWindow.once('ready-to-show', () => mainWindow.show());

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

if (process.env.NODE_ENV === 'development') {
  config = require('../config');
  config.url = `http://localhost:${config.port}`;
} else {
  config.devtron = false;
  config.url = `file://${__dirname}/dist/index.html`;
}

const downloadFile = exports.savePicture = (pictureData, id) => {
  const downloadPath = path.join(__dirname, '/imageDownloads');
  const oldBackground = fs.readdirSync(downloadPath)[0];
  oldBackground ? fs.unlinkSync(path.join(downloadPath, oldBackground)) : null;
  const targetPath = __dirname + `/imageDownloads/background${id}.jpg`;
  const imageRequest = request({
    method: 'GET',
    uri: pictureData.urls.full
  });
  const out = fs.createWriteStream(targetPath);
  imageRequest.pipe(out);
};

const openBrowser = exports.openInBrowser = (url) => {
  shell.openExternal(url);
};
