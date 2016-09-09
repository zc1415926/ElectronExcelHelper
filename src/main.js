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
var moment = require('moment');
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

ipc.on('converter-open-tdRhjxx', function (event) {
    dialog.showOpenDialog({
            title: '打开重庆天地人和街小学总课表',
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

                //读取Excel文件中的数据
                var sourceData = xlsx.parse(fs.readFileSync(filePath.toString()))[0]['data'];

                //求Excel表的最大宽度，因为0号行有合并的单元格造成最后几个单元格为空无法计入总数，所以按1号行进行计数
                var columnsLength = sourceData[1].length;
                var tempWeek = "";
                //把星期一行空的单元格填上内容
                //几个单元格合并并居中后，在读取时被识别为几个单独的单元格，且这几个单元格的首个存放内容，后边几个为空
                //使用如下代码，在内存中将值为空的单元格填上内容：在星期一行从左到右依次读取单元格，临时变量存储第一个
                //内容不为空的单元格内容，遇到空的单元格，就把之前读取的内容填入，读取到下个星期时，又会遇到一个内容不
                //为空的单元格，则临时变量存储新读取的单元格内容，继续填入内容为空的单元格
                for(var weekI = 0; weekI < columnsLength; weekI++){
                    if(sourceData[0][weekI] != null){
                        tempWeek = sourceData[0][weekI];
                    }
                    else{
                        sourceData[0][weekI] = tempWeek;
                    }
                }


                //从源文件的完整路径中取出所在目录的地址（去掉文件名）
                var targetPath = '';
                var tempTargetPath = String(filePath).split('\\');
                tempTargetPath.pop();
                tempTargetPath.forEach(function (pathItem) {
                    targetPath += pathItem+'\\';
                });
                //使用Unix时间作为文件名唯一性的保证
                targetPath += new Date().getTime() + '天地课表-已转换.xlsx';

                var currentTeacher = "";
                var subject = "";
                var gradeNum = "";
                var classNum = "";
                var gradeText = "";
                //var weekNum = "";
                //var orderNum = "";
                var tempSubjectGradeClass = [];
                //结果表的表头
                var exportData = [["年级", "班级", "课程", "教师", "星期", "节次"]];

                for(var rowI = 2; rowI < sourceData.length; rowI++){

                    //得到教师，表格2号行及之后的每行的0号单元格的内容为教师姓名
                    currentTeacher=sourceData[rowI][0];
                    //读取上边读取的教师的这一行
                    for(var colI = 1; colI < sourceData[rowI].length; colI++){
                        //如果这节课有课（单元格内容不为空）
                        if(sourceData[rowI][colI]){
                            //得到课程
                            tempSubjectGradeClass = String(sourceData[rowI][colI]).split('\n');
                            subject = tempSubjectGradeClass[0];
                            //得到年级的阿拉伯数字，转成汉字
                            tempSubjectGradeClass = String(tempSubjectGradeClass[1]).split('.');
                            gradeNum = tempSubjectGradeClass[0];
                            switch (gradeNum){
                                case '1':
                                    gradeText = '一年级';
                                    break;
                                case '2':
                                    gradeText = '二年级';
                                    break;
                                case '3':
                                    gradeText = '三年级';
                                    break;
                                case '4':
                                    gradeText = '四年级';
                                    break;
                                case '5':
                                    gradeText = '五年级';
                                    break;
                                case '6':
                                    gradeText = '六年级';
                                    break;
                            }
                            //得到班级
                            classNum = String(tempSubjectGradeClass[1]).replace('(', '').replace(')', '');
                            //向结果表中新插入一行
                            exportData.push([
                                gradeText,               //年级
                                classNum,                //班级
                                subject,                 //科目
                                currentTeacher,          //教师
                                sourceData[0][colI],     //星期，本节课所在单元格列数相同的0号行中的内容
                                sourceData[1][colI]      //节次，本节课所在单元格列数相同的1号行中的内容
                            ]);
                        }
                    }
                }

                var exportObj = xlsx.build([{name: "worksheet", data: exportData}], {bookType: 'xlsx'});
                fs.writeFileSync(targetPath, exportObj, 'binary');

                event.sender.send('converter-open-tdRhjxx-reply', targetPath);
            }
        });
});

ipc.on('converter-tdRhjxx-message', function (event, filePath) {
    dialog.showMessageBox({
            type: 'none',
            buttons: ['确定', '打开文件夹', '另存为'],
            defaultId: 0,
            title: '转换结果保存对话框',
            message: '文件已保存为：',
            detail: filePath,
            cancelId: 0,
            noLink: true
        },
        function (btnNumClicked) {
            if(btnNumClicked == 1){
                shell.showItemInFolder(filePath);
            }
            else if(btnNumClicked == 2){
                event.sender.send('converter-tdRhjxx-message-repaly-save-as', filePath);
            }
        }
    );
});

ipc.on('converter-tdRhjxx-save-to-dir', function (event, filePath) {
    dialog.showOpenDialog({
            title: '转换结果另存为',
            properties: ['openDirectory']
        },

        function (dirPaths) {
            if(!dirPaths){
                console.log('你没有成功选择一个文件夹');
            }
            else{
                console.log('你打开了文件夹：' + dirPaths);

                //从传入的保存文件的完成路径中提取出文件名
                var tempTargetFileNameArray = String(filePath).split('\\');
                var targetFileName = tempTargetFileNameArray[tempTargetFileNameArray.length-1];

                shelljs.cp(filePath, dirPaths+"\\"+targetFileName);
                event.sender.send('converter-tdRhjxx-save-to-dir-reply', dirPaths+"\\"+targetFileName);
            }
        }
    );
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

//TODO:反馈没有找到的文件
    /*
    * 使用node fs*/
    var fileDirPath = dirPath[0] + '\\';
    var files = fs.readdirSync(fileDirPath);

    var sPrefixFileName = '';
    var tPrefixFileName = '';
    var vPrefixFileNmae = '';

    var findTheFile = false;
    var notFindFileMessageArray = [];

    event.sender.send('renamer-frontend-log', [getTimeStamp() + '-----重命名操作开始-----']);

    for(var i = 0; i < renamePairArray.length; i++){

        //取出空行的话要就路过本次循环
        if(_.keys(renamePairArray[i]).length == 0){
            continue;
        }

        findTheFile = false;

        sPrefixFileName = renamePairArray[i]['sourceFileName'];
        tPrefixFileName = renamePairArray[i]['targetFileName'];

        _.forEach(files, function(value) {
            vPrefixFileNmae = value.split('.')[0];

            if(vPrefixFileNmae == sPrefixFileName){
                findTheFile = true;
                fs.rename(
                    fileDirPath + value,
                    fileDirPath + value.replace(vPrefixFileNmae, tPrefixFileName),
                    function(err){
                        if(err){
                            console.log(err);
                        }
                        //console.log('done!');
                    });
                //如果已经成功匹配成功了xlsx中的原文件名和真实的文件名，就结束当前forEach循环
                return false;
            }
        });

        if(!findTheFile){
            notFindFileMessageArray.push(getTimeStamp() +
                '没有找到前缀名为：“' + sPrefixFileName + '”的文件 T_T');
        }
    }

    notFindFileMessageArray.push(getTimeStamp() + '-----重命名操作完成-----');
    event.sender.send('renamer-frontend-log', notFindFileMessageArray);
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

function getTimeStamp(){
    return '[' + moment().format('HH:mm:ss.SSS') + ']　';
}