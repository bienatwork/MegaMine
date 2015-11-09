﻿'use strict'

angular.module('emine').factory('quarryService', quarryService);

quarryService.$inject = ['$http'];

function quarryService($http) {

    var service = {
        //colours
        colours: [],
        getMaterialColours: getMaterialColours,
        saveMaterialColour: saveMaterialColour,

        //product types
        productTypes: [],
        getProductTypes: getProductTypes,
        saveProductType: saveProductType,

        //quarries
        quarries: [],
        getQuarries: getQuarries,
        saveQuarry: saveQuarry,

        //yards
        yards: [],
        getYards: getYards,
        saveYard: saveYard,

        //material
        materialViewModel: {},
        getMaterialViewModel: getMaterialViewModel,
        saveMaterial: saveMaterial,

        //stockyard & Material Movement
        stock: [],
        getStock: getStock,
        moveMaterial: moveMaterial,
        materialUpdate: materialUpdate,

        //reports
        quarrySummary: [],
        quarrySummaryDetails: [],
        quarrySummaryGet: quarrySummaryGet,
        getQuarrySummaryDetails: getQuarrySummaryDetails,

        //product summary
        productSummary: [],
        productSummaryDetails: [],
        productSummaryGet: productSummaryGet,
        getProductSummaryDetails: getProductSummaryDetails,

    };

    return service;

    //Material Colour
    function getMaterialColours() {
        return $http.get("/api/quarry/materialcoloursget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.colours.splice(0, service.colours.length);
                angular.extend(service.colours, data);
            });
    }

    function saveMaterialColour(model) {
        var url;
        if (model.materialColourId === 0) {
            url = "/api/quarry/materialcolouradd";
        }
        else {
            url = "/api/quarry/materialcolourupdate";
        }

        return $http.post(url, model);
    }

    //Product Types
    function getProductTypes() {
        return $http.get("/api/quarry/producttypesget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.productTypes.splice(0, service.productTypes.length);
                angular.extend(service.productTypes, data);
            });
    }

    function saveProductType(model) {
        var url;
        if (model.productTypeId === 0) {
            url = "/api/quarry/producttypeadd";
        }
        else {
            url = "/api/quarry/producttypeupdate";
        }

        return $http.post(url, model);
    }

    //Quarry
    function getQuarries() {
        return $http.get("/api/quarry/quarriesget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.quarries.splice(0, service.quarries.length);
                angular.extend(service.quarries, data);
            });
    }

    function saveQuarry(model) {
        var url;
        if (model.quarryId === 0) {
            url = "/api/quarry/quarryadd";
        }
        else {
            url = "/api/quarry/quarryupdate";
        }

        return $http.post(url, model);
    }

    //Yardsrry
    function getYards() {
        return $http.get("/api/quarry/yardsget")
            .then(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.yards.splice(0, service.yards.length);
                angular.extend(service.yards, data);
            });
    }

    function saveYard(model) {
        var url;
        if (model.yardId === 0) {
            url = "/api/quarry/yardadd";
        }
        else {
            url = "/api/quarry/yardupdate";
        }

        return $http.post(url, model);
    }

    //material
    function getMaterialViewModel() {
        return $http.get("/api/quarry/materialviewmodelget")
            .then(function (data) {
                angular.extend(service.materialViewModel, data);
            });
    }
    function saveMaterial(models) {
        return $http.post("/api/quarry/materialsave", models);
    }

    //stock & material movement
    function getStock(yardId) {
        return $http.get("/api/quarry/stockget", { params: { "yardId": yardId } })
            .then(function (data) {
                service.stock.splice(0, service.stock.length);
                angular.extend(service.stock, data);
                return data;
            });
    }

    function moveMaterial(model) {
        return $http.post("/api/quarry/movematerial", model)
            .then(function (data) {
                service.stock.splice(0, service.stock.length);
                angular.extend(service.stock, data);
            });
    }

    function materialUpdate(model) {
        return $http.post("/api/quarry/materialupdate", model, { params: { "yardId": model.currentYardId } })
                .then(function (response) {
                    service.stock.splice(0, service.stock.length);
                    angular.extend(service.stock, response.data);
                    return response.data;
                });
    }

    //reports
    function quarrySummaryGet(searchParams) {
        return $http.post("/api/quarry/quarrysummary", searchParams)
            .then(function (data) {
                service.quarrySummary.splice(0, service.quarrySummary.length);
                angular.extend(service.quarrySummary, JSON.parse(data));
                return data;
            });
    }

    function getQuarrySummaryDetails(searchParams) {
        return $http.post("/api/quarry/quarrysummarydetails", searchParams)
            .then(function (data) {
                service.quarrySummaryDetails.splice(0, service.quarrySummaryDetails.length);
                angular.extend(service.quarrySummaryDetails, data);
                return data;
            });
    }

    function productSummaryGet(searchParams) {
        return $http.post("/api/quarry/productsummary", searchParams)
            .then(function (data) {
                service.productSummary.splice(0, service.productSummary.length);
                angular.extend(service.productSummary, data);
                return data;
            });
    }

    function getProductSummaryDetails(searchParams) {
        return $http.post("/api/quarry/productsummarydetails", searchParams)
            .then(function (data) {
                service.productSummaryDetails.splice(0, service.productSummaryDetails.length);
                angular.extend(service.productSummaryDetails, data);
                return data;
            });
    }

}