'use strict'
const electron = require('electron')
const path = require('path')
const fs = require('fs')
const { app, BrowserWindow } = electron

let mainWindow
let config = {}

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    title: 'Change of Scenery',
    height: 600,
    width: 800,
    minWidth: 500,
    minHeight: 600
  })

  mainWindow.loadURL(config.url)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
})

if (process.env.NODE_ENV === 'development') {
  config = require('../config')
  config.url = `http://localhost:${config.port}`
} else {
  config.devtron = false
  config.url = `file://${__dirname}/dist/index.html`
}

const getPath = exports.getPath = () => {
  return app.getAppPath()
}
