const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipc = electron.ipcMain;

var onlineStatusWindow;
// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('ready', function() {
  onlineStatusWindow = new BrowserWindow({ width: 50, height: 50, show: true });
  onlineStatusWindow.loadURL('file://' + __dirname + '/online-status.html');
  ipc.on('online-status-changed', function(event, status) {
  console.log(status);
  event.sender.send('result','send success');
  });

  ipc.on('synchronous-message', (event, arg) => {
  console.log(arg)  // prints "ping"
  event.returnValue = 'pong'
  })

  onlineStatusWindow.openDevTools();
  // 当 window 被关闭，这个事件会被发出
  onlineStatusWindow.on('closed', function() {
    // 取消引用 window 对象，如果你的应用支持多窗口的话，
    // 通常会把多个 window 对象存放在一个数组里面，
    // 但这次不是。
    onlineStatusWindow = null;
  });
  
});

// ipc.on('online-status-changed', function(event, status) {
//   console.log(status);
// });