// Modules to control application life and create native browser window
const { app, BrowserWindow, screen } = require('electron')
// const path = require('path')

app.allowRendererProcessReuse = true

let loading = true

const isDevelopment = process.env.NODE_ENV !== 'production'

function setLoading (payload = true) {
  loading = payload
}

function getCurrentDisplay () {
  const point = screen.getCursorScreenPoint()
  const display = screen.getDisplayNearestPoint(point)
  // console.log(display)
  return display
}

function createLoadingWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 400,
    height: 400,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
      // preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('app/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
  if (isDevelopment) {
    mainWindow.webContents.openDevTools()
  }
}

function createMainWindow () {
  // Create the browser window.
  const display = getCurrentDisplay()

  const mainWindow = new BrowserWindow({
    ...display.workArea,
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
      // preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  if (isDevelopment) {
    mainWindow.loadURL('http://localhost:8080')
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadURL('https://www.baidu.com')
  }

  mainWindow.webContents.on('devtools-opened', () => {
    console.log('on: devtools-opened')
    mainWindow.focus()
    setImmediate(() => {
      mainWindow.focus()
    })
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createLoadingWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    loading ? createLoadingWindow() : createMainWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

process.on('message', data => console.log('message data', data))

Object.assign(app, {
  setLoading,
  createMainWindow
})
