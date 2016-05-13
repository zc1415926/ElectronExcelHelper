/**
 * Created by zc1415926 on 2016/5/13.
 */
'use strict';

var EventEmitter = require('events').EventEmitter;
 /*var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../actions/actionTypes');*/
var assign = require('lodash.assign');

var xlsx = require('node-xlsx');

var CHANGE_EVENT = 'change';
var _students = [];

var StudentStore = assign({}, EventEmitter.prototype, {
    addChangeListener: function (callback) {
        this.addListener(CHANGE_EVENT, callback);
    },

    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT,callback);
    },

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },

    getAllStudents: function () {
        return _students;
    },

    getAuthorById: function (id) {
        _.find(_authors, {id: id})
    },

    getSheetHeader: function(xlsxPath, headerLineNum = 1){
        //从Excel文件中提取出源数据
       // var sourceData = xlsx.parse(xlsxPath);
        console.log(sourceData);
    }
});

/*Dispatcher.register(function (action) {
    switch (action.actionType){
        case ActionTypes.GET_ALL_STUDENTS:
            _students = action.students;
            StudentStore.emitChange();
            break;
        default:
        //nothing to do...
    }
});*/

module.exports = StudentStore;