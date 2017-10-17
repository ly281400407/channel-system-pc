const electron = require('electron')
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require('path')
const fs = require('fs')
const https = require('https')
const http = require('http')

var mainWindow = null;

var getUrlData = function (fileurl,filepath, success, error) {
  // 回调缺省时候的处理
  success = success || function () {};
  error = error || function () {};
  var url = fileurl+filepath;
  var urlTool;
  if(fileurl.indexOf("https")==-1){
    urlTool = http; 
  }else{
    urlTool = https;
  }
  urlTool.get(url, function (res) {
    var statusCode = res.statusCode;
    if (statusCode !== 200) {
        error();
        res.resume();
        return;
    }
    res.setEncoding('utf8');
    var rawData = '';
    res.on('data', function (chunk) {
      rawData += chunk;
    });
    // 请求结束
    res.on('end', function () {
      // 成功回调
      success(rawData);
    }).on('error', function (e) {
      // 出错回调
      error();
    });
  });
};

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('will-quit', function () {
  globalShortcut.unregisterAll()
});
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

  mainWindow.webContents.downloadURL("http://118.89.64.133:8181/channel-front/"+encodeURI("V8000 Setup 1.0.1.exe"));
  mainWindow.webContents.downloadURL("http://118.89.64.133:8181/channel-front/"+encodeURI("V8000-Setup-1.0.0.exe"));

  let childWindow =null;
    childWindow = new BrowserWindow({parent: mainWindow, transparent: true, width: 400,height: 600, center:true,frame: false,resizable: false,icon: __dirname + '/icon/logo.ico', show: false});
    childWindow.loadURL('file://' + __dirname + '/view/upgrade/install.html')
    childWindow.once('ready-to-show', () => {
      mainWindow.hide();
      childWindow.show();
      childWindow.webContents.send('updateVersion',"1.0.0"); 
     });


  mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
  item.setSavePath(__dirname+"\\tmp\\"+item.getFilename());
  item.on('updated', (event, state) => {
      if (state === 'interrupted') {
          console.log('Download is interrupted but can be resumed')
      } else if (state === 'progressing') {
        if (item.isPaused()) {
          console.log('Download is paused')
        } else {
          console.log('Received bytes:'+item.getFilename()+":"+item.getReceivedBytes());
            if(!childWindow.isDestroyed()){
              childWindow.webContents.send('rateOfProgress',parseInt(item.getReceivedBytes()/item.getTotalBytes()*100)); 
              childWindow.webContents.send('downloadfileName',item.getFilename()); 
            }
        }
      }
  });
  item.once('done', (event, state) => {
    if (state === 'completed') {
      console.log('Download successfully')
    } else {
      console.log('Download failed:'+state)
    }
  })
})
  getUrlData('http://118.89.64.133:8181/channel-front/',"version.json", function (data) {
    var obj=JSON.parse(data);
    console.log(obj);
  });
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
})