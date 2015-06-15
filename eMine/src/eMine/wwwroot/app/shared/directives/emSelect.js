﻿'use strict';
angular.module('emine').directive('emSelect', emSelect)
emSelect.$inject = ['$compile'];

function emSelect($compile) {
    return {
        restrict: 'E',
        scope: {
            ngModel: "=",
            optList: "=",
            optValue: "@",
            optText: "@",
            form: "=",
            label: '@',
            controlName: "@",
             ngRequired: '=',
            ngDisabled: '=',
            style: '@'
        },
        link: link,
    };

    function getTemplate(controlName, optValue, optText) {
        return '<md-input-container class="emselect {{errorCss}}" md-is-error="isFieldError()" style="{{style}}">'
                    + '<label>{{label}}</label>'
                    + '<md-select name="' + controlName + '" ng-required="{{ngRequired}}" ng-disabled="{{ngDisabled}}" ng-model="ngModel" aria-label="{{controlName}}">'
                    + '<md-option ng-value="opt.' + optValue + '" ng-repeat="opt in optList">{{ opt.' + optText + ' }}</md-option>'
                    + '</md-select>'
                    + '<div ng-messages="form[controlName].$error" ng-show="isFieldError()">'
                    + '<span ng-message="required">Required!</span>'
                    + '</div>'
                    + '</md-input-container>'
    }

    function link(scope, element, attrs, nullController, transclude) {

        scope.optValue = scope.optValue === undefined ? "Key" : scope.optValue
        scope.optText = scope.optText === undefined ? "Item" : scope.optText
        scope.errorCss = "";

        var elementHtml = getTemplate(scope.controlName, scope.optValue, scope.optText);
        element.html(elementHtml);
        $compile(element.contents())(scope);

        scope.isFieldError = function () {
            if (scope.form !== undefined) {
                var control = scope.form[scope.controlName];
                var isError = scope.form.$submitted && !control.$valid;
                if (isError)
                    scope.errorCss = "emselect-invalid";
                else
                    scope.errorCss = "";

                return isError;
            }
        }
    }
}