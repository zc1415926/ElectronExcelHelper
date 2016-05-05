/**
 * Created by zc1415926 on 2016/3/22.
 */
const xlsx = require('node-xlsx');
const fs = require('fs');

function converter(filePath){
    //console.log(filePath[0]);

    //构建目标数据表头
    var exportData = [["年级", "班级", "课程", "教师", "星期", "节次"]];

    var xlsxObject = xlsx.parse(filePath[0]);
   // console.log(xlsxObject);
    var sourceData = xlsxObject[0]['data'];

    var oneRowData = [,,,,,];

    for(var i = 3; i <= 100; i++){

        oneRowData[3] = sourceData[i][1];
        console.log(oneRowData);
        exportData.push(oneRowData);

    }

    var exportObj = xlsx.build([{name: "worksheet", data: exportData}], {bookType: 'xlsx'});
    fs.writeFileSync('output.xlsx' , exportObj, 'binary');
    //shell.mv('-f', 'output.xlsx', destDir);
}

module.exports.converter = converter;