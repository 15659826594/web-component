import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import ElectronStore from 'electron-store'
import { login } from './api/user'

const BrowserWindowMap = new Map()

const localStorage = new ElectronStore.default({
  width: {
    type: 'number',
    default: 1030
  },
  height: {
    type: 'number',
    default: 693
  }
})

// 创建登录窗口
function createLoginWin() {
  return NewBrowserWindow({
    html: '../renderer/login',
    width: 320,
    height: 448,
    show: false,
    autoHideMenuBar: true,
    frame: false,
    resizable: false
  })
}
// 创建主窗口
function createWindow() {
  const main = NewBrowserWindow({
    width: localStorage.get('width'),
    height: localStorage.get('height'),
    minWidth: 700,
    minHeight: 433,
    show: false,
    frame: false
  })
  // 监听窗口拉伸, 持久化
  main.on('resize', () => {
    const size = main.getContentSize()
    localStorage.set('width', size[0])
    localStorage.set('height', size[1])
  })
  return main
}

// function closeAllWins() {
//   const windows = BrowserWindow.getAllWindows()
//   for (const win of windows) {
//     win.close()
//   }
// }

app.whenReady().then(async () => {
  electronApp.setAppUserModelId('com.electron')
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  function openWin() {
    const userinfo = localStorage.get('userinfo')
    const timestamp = Math.floor(new Date().getTime() / 1000)
    let win
    win = createWindow()
    BrowserWindowMap.set('main', win)
    if (userinfo && userinfo.expiretime > timestamp) {
      // win = createWindow()
      // BrowserWindowMap.set('main', win)
    } else {
      // win = createLoginWin()
      // BrowserWindowMap.set('login', win)
    }
    return win
  }

  openWin()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) openWin()
  })
})

// 退出程序
ipcMain.on('quit', () => {
  app.quit()
})
// 关闭窗口
ipcMain.on('close', ({ sender }, frameTargetId) => {
  const current = frameTargetId ? BrowserWindow.fromId(frameTargetId) : BrowserWindow.fromWebContents(sender)
  if (current == null) {
    return
  }
  // 直接close会闪烁一下
  current.hide()
  const intervalId = setInterval(() => {
    if (!current.isVisible()) {
      current.close()
      clearInterval(intervalId)
    }
  }, 500)
})
// 登录
ipcMain.handle('login', async (_, data) => {
  try {
    const result = await login(data)
    if (result.code) {
      if (typeof result.data === 'object') {
        for (const key in result.data) {
          localStorage.set(key, result.data[key])
        }
        const win = BrowserWindowMap.get('login')
        if (win) {
          win.close()
          BrowserWindowMap.delete('login')
        }
        createWindow()
      }
    }
    return result
  } catch (error) {
    return error
  }
})
// 全屏窗口切换
ipcMain.on('fullScreenToggle', ({ sender }) => {
  const current = BrowserWindow.fromWebContents(sender)
  if (current == null) {
    return
  }
  if (current.isMaximized()) {
    current.restore()
  } else {
    current.maximize()
  }
})
// 最小化
ipcMain.on('minimize', ({ sender }) => {
  BrowserWindow.fromWebContents(sender)?.minimize()
})
// 打开一个子窗口
ipcMain.on('modal', ({ sender }, option) => {
  const parent = BrowserWindow.fromWebContents(sender)
  if (parent == null) {
    return -1
  }
  if (option?.modal) {
    option.parent = parent
  }
  const modal = NewBrowserWindow(option)
  return modal.id
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

function NewBrowserWindow(option) {
  const win = new BrowserWindow({
    width: 320,
    height: 448,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    },
    ...option
  })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (!option.show) {
    win.on('ready-to-show', () => {
      setTimeout(() => {
        win.show()
      }, option.delay || 0)
    })
  }

  if (option.html) {
    win.loadFile(join(__dirname, option.html + '.html') + (option.hash ? '#' + option.hash : ''))
  } else if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.loadURL(process.env['ELECTRON_RENDERER_URL'] + (option.hash ? '#' + option.hash : ''))
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html') + (option.hash ? '#' + option.hash : ''))
  }

  return win
}
