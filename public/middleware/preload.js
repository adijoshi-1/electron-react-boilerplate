const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('customapi', {
  rendererToMain: () => {
    ipcRenderer.send('renderer:main')
  },
  mainToRenderer: (message) => {
    ipcRenderer.on('main:renderer', message)
  },
})
