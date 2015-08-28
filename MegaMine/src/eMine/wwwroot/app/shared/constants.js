﻿'use strict'

angular.module('emine').factory('constants', constants);
constants.$inject = [];

function constants() {
    var vm = {
        enum: {},
        dateFormat: "dd/MM/yyyy",
        dateTimeFormat: "dd/MM/yyyy hh:mm a",
        momentDateTimeFormat: "L LT",
        devEnvironment: "development"
    };

    init();
    return vm;

    function init() {
        vm.enum.dialogMode = { view: 0, save: 1, delete: 2 }
    }

}