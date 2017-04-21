// Handle Squirrel events for Windows immediately on start
if(require('electron-squirrel-startup')) return;

// Imports de Biblioteca (Padrão)
const electron = require('electron');
const {app} = electron;
const {BrowserWindow} = electron;
const {autoUpdater} = electron;
const {ipcMain} = electron;
const os = require('os');
const path = require('path');

// Atalhos de Teclado
const electronLocalshortcut = require('electron-localshortcut');

// Logger
const logger = require('winston');
logger.level = 'debug';
global.logger = logger;

// Keep reference of main window because of GC
var mainWindow = null;

var updateFeed = 'http://localhost:3000/updates/latest';
var isDevelopment = true; //process.env.NODE_ENV === 'development';
var feedURL = "";

global.dialog = require('electron').dialog;

// var appMenu = require('./menus/appMenu.js')

// Don't use auto-updater if we are in development 
if (!isDevelopment) {
    if (os.platform() === 'darwin') {
        updateFeed = 'http://ea-todo.herokuapp.com/updates/latest'; 
    }
    else if (os.platform() === 'win32') {
        updateFeed = 'http://eatodo.s3.amazonaws.com/updates/latest/win' + (os.arch() === 'x64' ? '64' : '32');
    }

    autoUpdater.addListener("update-available", function(event) {
        logger.debug("A new update is available");
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-available');
        }
    });
    autoUpdater.addListener("update-downloaded", function(event, releaseNotes, releaseName, releaseDate, updateURL) {
        logger.debug("A new update is ready to install", `Version ${releaseName} is downloaded and will be automatically installed on Quit`);
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-downloaded');
        }
    });
    autoUpdater.addListener("error", function(error) {
        logger.error(error);
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-error');
        }
    });
    autoUpdater.addListener("checking-for-update", function(event) {
        logger.debug("Checking for update");
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'checking-for-update');
        }
    });
    autoUpdater.addListener("update-not-available", function() {
        logger.debug("Update not available");
        if (mainWindow) {
            mainWindow.webContents.send('update-message', 'update-not-available');
        }
    });
    
    const appVersion = require('./package.json').version;
    const feedURL = updateFeed + '?v=' + appVersion;
    autoUpdater.setFeedURL(feedURL);
}

// Quit when all windows are closed
app.on('window-all-closed', function() {
	app.quit();
});

// When application is ready, create application window
app.on('ready', function() {

    logger.debug("Starting application");

    // Create main window
    // Other options available at:
    // http://electron.atom.io/docs/latest/api/browser-window/#new-browserwindow-options
    mainWindow = new BrowserWindow({
        name: "React Native Layout Creator",
        width: 1280,
        height: 720,
        toolbar: false
    });

    // Target HTML file which will be opened in window
    mainWindow.loadURL('file://' + __dirname + "/index.html");

    // Uncomment to use Chrome developer tools
    // mainWindow.webContents.openDevTools({detach:true});

    // Cleanup when window is closed
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
    
    if (!isDevelopment) {
        mainWindow.webContents.on('did-frame-finish-load', function() {
            logger.debug("Checking for updates: " + feedURL);
            autoUpdater.checkForUpdates();
        });
    }

    // Atalhos do Teclado

    // Nova Cena
    electronLocalshortcut.register(mainWindow, 'CommandOrControl+N', function () {
    //     // TODO: Nova Cena
    });

    // Abrir Cena
    electronLocalshortcut.register(mainWindow, 'CommandOrControl+O', function () {
        dialog.showOpenDialog({
                properties: ['openFile']
        });
    });

    // Salvar Cena
    electronLocalshortcut.register(mainWindow, 'CommandOrControl+S', function () {
        const options = {
                title: 'Salvar Cena',
            }
        dialog.showSaveDialog(options);
    });

    // Salvar Como...
    electronLocalshortcut.register(mainWindow, 'CommandOrControl+Shift+S', function () {
        const options = {
                title: 'Salvar Cena Como...',
            }
        dialog.showSaveDialog(options);
    });

    // // Importar
    electronLocalshortcut.register(mainWindow, 'CommandOrControl+I', function () {
        // TODO: Importar
    });

    // // Exportar
    electronLocalshortcut.register(mainWindow, 'CommandOrControl+E', function () {
        // TODO: Exportar
    });

    // // F12 - Lista de Comandos
    electronLocalshortcut.register(mainWindow, 'CommandOrControl+F12', function () {
        // FIXME: Implementar atalho como F12 somente
        const modalPath = path.join('file://', __dirname, '/commandList.html')
        let commandList = new BrowserWindow({
            name: "Lista de Comandos",
            width: 800,
            height: 600,
            toolbar: true,
            frame: false
        })
        commandList.on('close', function () { win = null })
        commandList.loadURL(modalPath)
        commandList.show() 
    });

    // // F12 - Escolha de Tema
    electronLocalshortcut.register(mainWindow, 'CommandOrControl+Alt+T', function () {
        
        const modalPath = path.join('file://', __dirname, '/themeChooser.html')
        let commandList = new BrowserWindow({
            name: "Lista de Comandos",
            width: 640,
            height: 480,
            toolbar: true,
            frame: false
        })
        commandList.on('close', function () { win = null })
        commandList.loadURL(modalPath)
        commandList.show() 
    });

});

app.on('will-quit', function(){

    // Unregister all shortcuts.
    electronLocalshortcut.unregisterAll(mainWindow);
});