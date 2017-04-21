const electron = require('electron')
const dialog = require('electron').dialog
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu
const app = electron.app

let template = [{
  label: 'Arquivo',
  submenu:[{
    label: 'Nova Cena',
    accelerator: 'CmdOrCtrl+N',
  }, {
    label: 'Abrir Cena',
    accelerator: 'CmdOrCtrl+O',
    click: function () {
      dialog.showOpenDialog({
        properties: ['openFile']
      })
    }
  }, {
    label: 'Abrir Recente'
  }, {
    label: 'Salvar',
    accelerator: 'CmdOrCtrl+S',
    click: function () {
      const options = {
        title: 'Salvar Cena',
      }
      dialog.showSaveDialog(options)
    }
  }, {
    label: 'Salvar Como...',
    accelerator: 'CmdOrCtrl+Shift+S',
    click: function () {
        const options = {
          title: 'Salvar Cena Como',
        }
      dialog.showSaveDialog(options)
    }
  }, {
    label: 'Importar',
    accelerator: 'CmdOrCtrl+I'
  }, {
    label: 'Exportar',
    submenu: [{
      label: 'Exportar Imagem',
      click: function () {
        const options = {
          title: 'Exportar Imagem',
          filters: [
            { name: 'Images', extensions: ['jpg', 'png', 'gif'] }
          ]
        }
      dialog.showSaveDialog(options)
    }
    }, {
      label: 'Exportar Código',
      click: function () {
        const options = {
          title: 'Exportar Código',
          filters: [
            { name: 'Javascript', extensions: ['js'] }
          ]
        }
      dialog.showSaveDialog(options)
    }
    }]
  }, {
    label: 'Sair',
    accelerator: 'CmdOrCtrl+Q',
    click: function () {
        app.quit()
    }
  }]
}, {
  label: 'Editar',
  submenu: [{
    label: 'Undo',
    accelerator: 'CmdOrCtrl+Z',
    role: 'undo'
  }, {
    label: 'Redo',
    accelerator: 'Shift+CmdOrCtrl+Z',
    role: 'redo'
  }, {
    type: 'separator'
  }, {
    label: 'Cut',
    accelerator: 'CmdOrCtrl+X',
    role: 'cut'
  }, {
    label: 'Copy',
    accelerator: 'CmdOrCtrl+C',
    role: 'copy'
  }, {
    label: 'Paste',
    accelerator: 'CmdOrCtrl+V',
    role: 'paste'
  }, {
    label: 'Select All',
    accelerator: 'CmdOrCtrl+A',
    role: 'selectall'
  }]
}, {
  label: 'View',
  submenu: [{
    label: 'Recarregar',
    accelerator: 'CmdOrCtrl+R',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        // on reload, start fresh and close any old
        // open secondary windows
        if (focusedWindow.id === 1) {
          BrowserWindow.getAllWindows().forEach(function (win) {
            if (win.id > 1) {
              win.close()
            }
          })
        }
        focusedWindow.reload()
      }
    }
  }, {
    label: 'Tela Inteira',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Ctrl+Command+F'
      } else {
        return 'F11'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
      }
    }
  }, {
    label: 'Ferramentas de Desenvolvedor',
    accelerator: (function () {
      if (process.platform === 'darwin') {
        return 'Alt+Command+I'
      } else {
        return 'Ctrl+Shift+I'
      }
    })(),
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        focusedWindow.toggleDevTools()
      }
    }
  }, {
    type: 'separator'
  }, {
    label: 'App Menu Demo',
    click: function (item, focusedWindow) {
      if (focusedWindow) {
        const options = {
          type: 'info',
          title: 'Application Menu Demo',
          buttons: ['Ok'],
          message: 'This demo is for the Menu section, showing how to create a clickable menu item in the application menu.'
        }
        electron.dialog.showMessageBox(focusedWindow, options, function () {})
      }
    }
  }]
}, {
  label: 'Janela',
  role: 'window',
  submenu: [{
    label: 'Minimizar',
    accelerator: 'CmdOrCtrl+M',
    role: 'minimize'
  }, {
    label: 'Maximizar',
    role: 'maximize'
  }, {
    label: 'Fechar',
    accelerator: 'CmdOrCtrl+W',
    role: 'close'
  }, {
    type: 'separator'
  }, {
    label: 'Reabrir Janela',
    accelerator: 'CmdOrCtrl+Shift+T',
    enabled: false,
    key: 'reopenMenuItem',
    click: function () {
      app.emit('activate')
    }
  }]
}, {
  label: 'Preferências',
  submenu: [{
    label: 'Tema'
  }, {
    label: 'Configurações'
  }]
}, {
  label: 'Ajuda',
  role: 'help',
  submenu: [{
    label: 'Learn More',
    click: function () {
      electron.shell.openExternal('http://electron.atom.io')
    }
  }, {
    label: 'Sobre o RNLC'
  }]
}]

function addUpdateMenuItems (items, position) {
  if (process.mas) return

  const version = electron.app.getVersion()
  let updateItems = [{
    label: `Version ${version}`,
    enabled: false
  }, {
    label: 'Checking for Update',
    enabled: false,
    key: 'checkingForUpdate'
  }, {
    label: 'Check for Update',
    visible: false,
    key: 'checkForUpdate',
    click: function () {
      require('electron').autoUpdater.checkForUpdates()
    }
  }, {
    label: 'Restart and Install Update',
    enabled: true,
    visible: false,
    key: 'restartToUpdate',
    click: function () {
      require('electron').autoUpdater.quitAndInstall()
    }
  }]

  items.splice.apply(items, [position, 0].concat(updateItems))
}

function findReopenMenuItem () {
  const menu = Menu.getApplicationMenu()
  if (!menu) return

  let reopenMenuItem
  menu.items.forEach(function (item) {
    if (item.submenu) {
      item.submenu.items.forEach(function (item) {
        if (item.key === 'reopenMenuItem') {
          reopenMenuItem = item
        }
      })
    }
  })
  return reopenMenuItem
}

if (process.platform === 'darwin') {
  const name = electron.app.getName()
  template.unshift({
    label: name,
    submenu: [{
      label: `About ${name}`,
      role: 'about'
    }, {
      type: 'separator'
    }, {
      label: 'Services',
      role: 'services',
      submenu: []
    }, {
      type: 'separator'
    }, {
      label: `Hide ${name}`,
      accelerator: 'Command+H',
      role: 'hide'
    }, {
      label: 'Hide Others',
      accelerator: 'Command+Alt+H',
      role: 'hideothers'
    }, {
      label: 'Show All',
      role: 'unhide'
    }, {
      type: 'separator'
    }, {
      label: 'Quit',
      accelerator: 'Command+Q',
      click: function () {
        app.quit()
      }
    }]
  })

  // Window menu.
  template[3].submenu.push({
    type: 'separator'
  }, {
    label: 'Bring All to Front',
    role: 'front'
  })

  addUpdateMenuItems(template[0].submenu, 1)
}

if (process.platform === 'win32') {
  const helpMenu = template[template.length - 1].submenu
  addUpdateMenuItems(helpMenu, 0)
}

app.on('ready', function () {
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
})

app.on('browser-window-created', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
  let reopenMenuItem = findReopenMenuItem()
  if (reopenMenuItem) reopenMenuItem.enabled = true
})
