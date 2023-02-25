require('dotenv').config()
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const mainWindow = () => {
  // eslint-disable-next-line no-undef
  const NODE_ENV = process.env.NODE_ENV
  const window = new BrowserWindow({
    webPreferences: {
      // eslint-disable-next-line no-undef
      preload: path.join(__dirname) + '/middleware/preload.js',
    },
    width: '720',
    height: '480',
  })

  ipcMain.on('renderer:main', () => {
    window.webContents.send('main:renderer', 'Hello World')
  })

  NODE_ENV === 'development'
    ? window.loadURL('http://localhost:3000')
    : window.loadFile('build/index.html')
}

app.whenReady().then(() => {
  mainWindow()
})

app.on('window-all-closed', () => {
  // eslint-disable-next-line no-undef
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
