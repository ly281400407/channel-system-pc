const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path');
const fs = require('fs')
const os = require('os')
const ipcMain = electron.ipcMain;
const shell = electron.shell
const Menu = electron.Menu

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (process.platform != 'darwin') {
    app.quit();
  }
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
    icon: __dirname + '/img/logo.png'
  });


  // 加载应用的首页html
  mainWindow.loadURL('file://' + __dirname + '/view/login/etp_sign.html');

  ipcMain.on('mainWindowHide', (e, arg) => {
    if(arg=='hide'){
      mainWindow.hide();
    }else{
      mainWindow.show();
    }
    
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