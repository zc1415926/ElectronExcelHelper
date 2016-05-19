/**
 * Created by ZC on 2016/3/14.
 */
'use strict';

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const dialog = require('electron').dialog;
const shell = electron.shell;
var xlsx = require('node-xlsx');
var ipc = require('electron').ipcMain;
//var remote = require('electron').remote;
var fs = require('fs');
//const tdRhjxxCoverter = require('./js/utils/tdRhjxxConverter');
var _ = require('lodash');
var shelljs = require('shelljs');
var mainWindow = null;

app.on('window-all-closed', function () {
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        frame: false,
        width: 1024,
        height: 768,
        resizable: false
    });

    mainWindow.loadURL('file://' + __dirname + '/index.html');

    mainWindow.webContents.openDevTools(['bottom']);

    mainWindow.on('close', function () {
        mainWindow = null;
    });

});

ipc.on('renamer-open-file', function (event) {
    dialog.showOpenDialog({
            title: '我是一个对话框',
            filters: [{name: '电子表格', extensions: ['xls', 'xlsx']},
                {name: 'All Files', extensions: ['*']}],
            properties: ['openFile']
        },

        function (filePath) {
            if(!filePath){
                console.log('你没有成功选择一个文件');
            }
            else{
                console.log('你打开了文件：' + filePath);

                var sourceData = xlsx.parse(fs.readFileSync(filePath.toString()))[0]['data'];
                sourceData.push(filePath)
                event.sender.send('renamer-open-file-reply', sourceData);
                //检测这个文件是否可读
            }
        });
});

ipc.on('renamer-open-dir', function (event) {
    dialog.showOpenDialog({
            title: '我是一个打开文件夹对话框',
            properties: ['openDirectory']
        },

        function (dirPaths) {
            if(!dirPaths){
                console.log('你没有成功选择一个文件夹');
            }
            else{
                console.log('你打开了文件夹：' + dirPaths);

                event.sender.send('dir-path-reply', dirPaths);
                //检测这个文件夹是否可读
            }
        }
    );
});

ipc.on('renamer-do-rename', function(event, renamePairArray, dirPath){
    /* 使用shelljs 对文件进行重命名

    shelljs.cd(dirPath);

    //console.log(renamePairArray);

    for(var i = 0; i < renamePairArray.length; i++){
        //console.log(renamePairArray[i]['sourceFileName'] + '*');
        var fileListLength = shelljs.ls(renamePairArray[i]['sourceFileName'] + '*').length;

        if(fileListLength > 0){

            var sFileName = shelljs.ls(renamePairArray[i]['sourceFileName'] + '*')['stdout'];
            sFileName = sFileName.replace('\n', '');

            var tFileName = sFileName.replace(renamePairArray[i]['sourceFileName'], renamePairArray[i]['targetFileName']);

            shelljs.mv('-f', sFileName, tFileName);
        }
//TODO:反馈没有找到的文件
    }*/

    /*
    * 使用node fs*/

    var fileDirPath = dirPath[0] + '\\';
    console.log(fileDirPath);
    var files = fs.readdirSync(fileDirPath);

    //console.log(files);
    var sPrefixFileName = '';
    var tPrefixFileName = '';
   // var sFileFullPath = '';
   // var tFileFullPath = '';


    for(var i = 0; i < renamePairArray.length; i++){
        sPrefixFileName = renamePairArray[i]['sourceFileName'];
        tPrefixFileName = renamePairArray[i]['targetFileName'];

        _.forEach(files, function(value, key) {
            //console.log(value);
            //console.log(renamePairArray[i]['sourceFileName']);
            //console.log(value.indexOf(renamePairArray[i]['sourceFileName']));


            if(value.indexOf(sPrefixFileName) != -1){

                fs.rename(
                    fileDirPath + value,
                    fileDirPath + value.replace(sPrefixFileName, tPrefixFileName),
                    function(err){
                        if(err){
                            console.log(err);
                        }
                        //console.log('done!');
                    });
            }
        });
    }
});

ipc.on('msg-box', function () {
    dialog.showMessageBox({
            type: 'none',
            buttons: ['按钮1', '按钮2'],
            defaultId: 0,
            title: '我是保存文件对话框',
            message: '我这里有一条非常重要的消息！',
            detail: '这里是详细信息',
            cancelId: 1,
            noLink: true
        },
        function (filePaths) {
            console.log(filePaths);
        }
    );
});

ipc.on('err-box', function () {
    dialog.showErrorBox(
        '我是报错对话框',
        '不好啦，出错啦！'
    );
});

ipc.on('closeMainWindow', function(){
    dialog.showMessageBox({
            type: 'question',
            buttons: ['残忍关闭', '取消'],
            defaultId: 0,
            title: '确认要退出？',
            message: '主人，真的忍心要把我关掉吗？',
            cancelId: 1,
            noLink: true
        },
        function (value) {
            if(0 == value){
                app.quit();
            }
        }
    );
});

ipc.on('open-doc', function(){
    shell.openExternal('https://github.com/zc1415926/ElectronExcelHelper');
});