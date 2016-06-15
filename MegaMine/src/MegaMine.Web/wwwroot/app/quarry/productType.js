﻿'use strict';
angular.module('megamine').controller('productType', productType)
productType.$inject = ['quarryService', 'utility', 'constants', 'dialogService', 'template', 'message'];

function productType(quarryService, utility, constants, dialogService, template, message) {

    var gridOptions = {
        columnDefs: [
                    { name: 'productTypeName', field: 'productTypeName', displayName: 'Product Type', type: 'string' },
                    { name: 'productTypeDescription', field: 'productTypeDescription', type: 'string', displayName: 'Description' },
                    { name: 'formulaString', field: 'formulaString', type: 'string', displayName: 'Formula' },
                    { name: 'formulaOrder', field: 'formulaOrder', type: 'string', displayName: 'Formula Order' }
                ]
    };

    var vm = {
        dashboard: {
            header: 'Product Types',
            widgets: {
                allWidgets: quarryService.productTypes.widgets.allWidgets,
                pageWidgets: quarryService.productTypes.widgets.pageWidgets,
            },
            records: {
                options: {
                    primaryField: 'productTypeId',
                    data: quarryService.productTypes.list,
                    view: viewDialog
                },
                list: {
                    options: {
                        fields: ['productTypeName', 'productTypeDescription', 'formulaString']
                    },
                },
                grid: {
                    options: gridOptions
                },
                buttons: {
                    add: {
                        text: 'New',
                        toolTip: 'New Product Type',
                        claim: 'Quarry:ProductTypeAdd',
                        save: addProductType,
                    },
                    edit: {
                        claim: 'Quarry:ProductTypeEdit'
                    },
                    delete: {
                        claim: 'Quarry:ProductTypeDelete'
                    }
                }
            }
        }
    };

    init();

    return vm;

    function init() {
        angular.forEach(quarryService.productTypes.list, function (item) {
            initializeModel(item);
        });
    }

    function initializeModel(model) {
        if (model.formula === undefined)
            model.formula = null;

        model.formulaJson = JSON.parse(model.formula);
        model.formulaString = getFormulaString(model.formulaJson, model.processType);
        if (model.formulaJson === null) {
            model.formulaJson = [];
            model.formulaJson.push({ field: 'Length', operand: '>=' });
            model.formulaJson.push({ field: 'Width', operand: '<=' });
        }

        return model;
    }

    function getFormulaString(formulaJson, processType) {
        if (processType == 2)
            return "";
        var formulaString = '';
        angular.forEach(formulaJson, function (jsonItem) {
            if (valueExists(jsonItem.value)) {
                if (formulaString !== '') {
                    formulaString += " & ";
                }
                formulaString += jsonItem.field + ' ' + jsonItem.operand + ' ' + jsonItem.value;
            }
        });
        return formulaString;
    }

    function valueExists(value) {
        if (value !== '' && value !== null && value !== undefined)
            return true;
        else
            return false;
    }

    function validateFormulaOrder(form) {
        if (form !== undefined) {
            var counter = 0;
            var controlName = '';
            var formulaExists = false;
            while (true) {
                controlName = "formulaValue_" + counter;
                if (form[controlName] === undefined)
                    break;
                if (!utility.isEmpty(form[controlName].$modelValue)) {
                    formulaExists = true;
                    break;
                }
                counter++;
            }
            
            if (formulaExists && utility.isEmpty(form.formulaOrder.$modelValue)) {
                form.formulaOrder.$setValidity('orderRequired', false)
            }
            else {
                form.formulaOrder.$setValidity('orderRequired', true)
            }
        }
    }

    function addProductType(ev) {
        var model = initializeModel({ productTypeId: 0, processType: 1 });
        viewDialog(model, constants.enum.dialogMode.save, ev);
    }

    function viewDialog(model, dialogMode, ev) {
        var validator = {
            orderErrorMessages: [{ type: 'orderRequired', text: message.required }],
            validateFormulaOrder: validateFormulaOrder
        }

        var disabled = dialogMode !== constants.enum.dialogMode.save

        dialogService.show({
            templateUrl: 'product_type_dialog',
            targetEvent: ev,
            data: { model: model, validator: validator, disabled: disabled },
            dialogMode: dialogMode,
            parentVm: vm
        })
        .then(function (dialogModel) {
            if (dialogMode === constants.enum.buttonType.delete) {
                quarryService.deleteProductType(dialogModel.productTypeId).then(function () {
                    quarryService.getProductTypes();
                    dialogService.hide();
                });
            }
            else {
                dialogModel.formula = JSON.stringify(dialogModel.formulaJson);
                quarryService.saveProductType(dialogModel).then(function () {
                    //update the grid values
                    if (dialogModel.productTypeId === 0) {
                        quarryService.getProductTypes().then(function () {
                            angular.forEach(quarryService.productTypes, function (item) {
                                initializeModel(item);
                            });
                        });
                    }
                    else {
                        model.productTypeName = dialogModel.productTypeName;
                        model.productTypeDescription = dialogModel.productTypeDescription;
                        model.processType = dialogModel.processType;
                        model.formulaString = getFormulaString(dialogModel.formulaJson, dialogModel.processType);
                        model.formula = JSON.stringify(dialogModel.formulaJson);
                        model.formulaJson = angular.copy(dialogModel.formulaJson);
                        model.formulaOrder = dialogModel.formulaOrder
                    }

                    dialogService.hide();
                });
            }
        });
    }
}

