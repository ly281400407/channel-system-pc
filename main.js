const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path')
const fs = require('fs')
const os = require('os')
const ipcMain = electron.ipcMain;
const shell = electron.shell;
const Menu = electron.Menu;
const {dialog} = require('electron');
const {autoUpdater} = require("electron-updater");
const globalShortcut = electron.globalShortcut;



// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;
//弹出是否更新提示
function alertSelectUpdate(version){
    let currentVersion = app.getVersion();
    const options = {
      type: 'info',
      title: '版本更新信息',
      message: "您现在使用的版本为"+app.getVersion()+",现已检测到新版本"+version+",是否进行更新？",
      buttons: ['是', '跳过此版本','以后提醒我'],
      icon:__dirname + '/icon/logo.ico'
    }
    
    dialog.showMessageBox(options, function (index) {
      if(index==0){
         mainWindow.loadURL('file://' + __dirname + '/version.html');
         autoUpdater.downloadUpdate();
      }
      setTimeout(function() {
        mainWindow.show(); 
        
        mainWindow.webContents.send('currentVersion', currentVersion); 
        mainWindow.webContents.send('updateVersion', autoUpdater.versionInfo.version); 
      }, 2000);
  
    })
  }
  //显示消息
  function showMessageBox(title,context){
    const options = {
              type: 'info',
              title: title,
              message: context,
              icon:__dirname + '/icon/logo.ico'
            }
    dialog.showMessageBox(options);
  }
 //发送信息到body
    function sendStatusToWindow(text) {
      mainWindow.webContents.send('message', text);
    }
//添加更新信息
    let message={
      error:'检查更新出错',
      checking:'正在检查更新……',
      updateAva:'检测到新版本，正在下载……',
      updateNotAva:'现在使用的就是最新版本，不用更新',
    };
    autoUpdater.autoDownload=false;
    autoUpdater.setFeedURL('http://118.89.64.133:8181/channel-front');
    //添加更新监听
    autoUpdater.on('error', function(error){
        sendStatusToWindow(message.error)
    });
    autoUpdater.on('checking-for-update', function() {
        sendStatusToWindow(message.checking)
    });
    autoUpdater.on('update-available', function(info) {
        mainWindow.hide();
        console.log(autoUpdater.versionInfo);
        alertSelectUpdate(autoUpdater.versionInfo.version);
    });
    autoUpdater.on('update-not-available', function(info) {
        sendStatusToWindow(message.updateNotAva)
    });
    
    // 更新下载进度事件
    autoUpdater.on('download-progress', function(progressObj) {
       let log_message = "当前下载速度为: " + (progressObj.bytesPerSecond/1024).toFixed(2)+"KB/S";
       log_message = log_message + ' - 下载进度为 ' + progressObj.percent.toFixed(2) + '%';
       log_message = log_message + ' (' + (progressObj.transferred/1024/1024).toFixed(2) + "M/" + (progressObj.total/1024/1024).toFixed(2) + 'M)';
       sendStatusToWindow(log_message);
    })
    autoUpdater.on('update-downloaded',  function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
       showMessageBox("版本更新","安装包下载完毕，请点击确认进行安装");
       setTimeout(function() {autoUpdater.quitAndInstall(); }, 3000);
    });    

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('will-quit', function () {
  globalShortcut.unregisterAll()
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function () {
 
  // 创建浏览器窗口。
  mainWindow = new BrowserWindow({
    width: 724,
    height: 514, 
    frame: false,
    resizable: false,
    //usesContentSize: true,
    icon: __dirname + '/icon/logo.ico'
  });
 
  // 加载应用的首页html
  mainWindow.loadURL('file://' + __dirname + '/view/login/etp_sign.html');
  //检查是否有更新
  autoUpdater.checkForUpdates();

  
  //监听window隐藏显示事件
   ipcMain.on('mainWindowHide', (e, arg) => {
    if(arg=='hide'){
      mainWindow.hide();
    }else{
      mainWindow.show();
    }
  });

  //监听更新事件
   ipcMain.on('checkforupdate', (e, arg) => {
    autoUpdater.checkForUpdates();
  });

  globalShortcut.register('CommandOrControl+Q', function () {
    app.quit();
  });


  //Menu.setApplicationMenu(null);
  /* //当加载第三方网站时需要禁用node模块
  //在申明BrowserWindow时候加入
// var mainWindow = new BrowserWindow({
//   webPreferences: {
//     nodeIntegration: false
//   }
// });

  //mainWindow.loadURL("https://www.baidu.com");

  //打印
  ipc.on('print-to-pdf', function (event) {
    const pdfPath = path.join(os.tmpdir(), 'print.pdf')
    const win = BrowserWindow.fromWebContents(event.sender)
    // Use default printing options
    win.webContents.printToPDF({}, function (error, data) {
      if (error) throw error
      fs.writeFile(pdfPath, data, function (error) {
        if (error) {
          throw error
        }
        shell.openExternal('file://' + pdfPath)
        event.sender.send('wrote-pdf', pdfPath)
      })
    })
  })
}); */
  // 当 window 被关闭，这个事件会被发出
  mainWindow.on('closed', function () {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 但这次不是。
    mainWindow = null;
  });
})