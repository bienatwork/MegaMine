﻿'use strict'

angular.module('emine').factory('vehicleService', vehicleService);

vehicleService.$inject = ['$http'];

function vehicleService($http) {

    var service = {
        //master tables
        vehicleTypes: [],
        drivers: [],

        //vehicles
        vehicleList: [],
        vehicle: {},
        currentVehicle: {},
        currentVehicleService: {},

        //vehicles
        getVehicleList: getVehicleList,
        getVehicle: getVehicle,
        getCurrentVehicle: getCurrentVehicle,
        getCurrentService: getCurrentService,
        saveVehicle: saveVehicle,
        saveVehicleService: saveVehicleService,

        //fuel
        fuelList: [],
        getFuelList: getFuelList,
        saveFuel: saveFuel,

        //vehicle driver
        vehicleDriverList: [],
        driverListItems: [],
        getVehicleDriverList: getVehicleDriverList,
        getDriversListItems: getDriversListItems,
        saveVehiceDriver: saveVehiceDriver,

        //vehicle types
        getVehicleType: getVehicleType,
        saveVehicleType: saveVehicleType,

        //drivers
        getDrivers: getDrivers,
        saveDriver: saveDriver,


        //spare parts
        sparePartList: [],
        sparePart: {},
        currentSparePart: {},
        currentSparePartOrder: {},

        //spare parts
        getSparePartList: getSparePartList,
        getSparePart: getSparePart,
        getCurrentSparePart: getCurrentSparePart,
        getCurrentSparePartOrder: getCurrentSparePartOrder,
        saveSparePart: saveSparePart,
        saveSparePartOrder: saveSparePartOrder,

        //Manufacturers data types
        manufacturerList: [],
        manufacturer: {},
        currentManufacturer: {},

        //Manufacturers methods
        getManufacturerList: getManufacturerList,
        getCurrentManufacturer: getCurrentManufacturer,
        saveManufacturer: saveManufacturer,
        
    };

    return service;

    function getVehicleList() {
        return $http.get("/api/fleet/vehiclelist")
            .success(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.vehicleList.splice(0, service.vehicleList.length);
                angular.extend(service.vehicleList, data);
            })
    }

    function getManufacturerList() {
        return $http.get("/api/fleet/manufacturersGet")
            .success(function (data) {
                //in order to refresh the grid, we need to remove all the elements and add them again
                service.manufacturerList.splice(0, service.manufacturerList.length);
                angular.extend(service.manufacturerList, data);
            })
    }

    function getVehicle(vehicleId) {
        return $http.get("/api/fleet/vehicledetailsget", { params: { "vehicleId": vehicleId } })
            .success(function (data) {
                service.vehicle = data
            })
    }

    function getFuelList(vehicleId) {
        return $http.get("/api/fleet/fuelgetlist", { params: { "vehicleId": vehicleId } })
            .success(function (data) {
                service.fuelList.splice(0, service.fuelList.length);
                angular.extend(service.fuelList, data);
            })
    }

    function saveFuel(model) {
        return $http.post("/api/fleet/fuelsave", model);
    }

    function getVehicleDriverList(vehicleId) {
        return $http.get("/api/fleet/vehicledrivergetlist", { params: { "vehicleId": vehicleId } })
            .success(function (data) {
                service.vehicleDriverList.splice(0, service.vehicleDriverList.length);
                angular.extend(service.vehicleDriverList, data);
            })
    }

    function saveVehiceDriver(model) {
        return $http.post("/api/fleet/vehicledriversave", model);
    }

    function getDriversListItems(vehicleId) {
        return $http.get("/api/fleet/driverslistget")
            .success(function (data) {
                service.driverListItems = data
            })
    }


    function getCurrentService(vehicleServiceId) {
        return $http.get("/api/fleet/vehicleserviceget", { params: { "VehicleServiceId": vehicleServiceId } })
            .success(function (data) {
                angular.extend(service.currentVehicleService, data);
            })
    }

    function saveVehicleService(model) {
        //for adding we need to populate the vehicleid
        if (model.VehicleId === 0) {
            model.VehicleId = service.vehicle.VehicleId;
        }
        return $http.post("/api/fleet/vehicleservicesave", model)
            .success(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.vehicle.ServiceRecord.splice(0, service.vehicle.ServiceRecord.length);
                angular.extend(service.vehicle.ServiceRecord, data.ServiceRecord);
            })
    }

    function getCurrentVehicle(vehicleId) {
        return $http.get("/api/fleet/vehicleget", { params: { "vehicleId": vehicleId } })
            .success(function (data) {
                angular.extend(service.currentVehicle, data);
                if (vehicleId === 0) {
                    service.currentVehicle.VehicleTypeId = undefined;
                    service.currentVehicle.VehicleManufacturerId = undefined;
                    service.currentVehicle.VehicleModelId = undefined;
                }
            })
    }

    function getCurrentManufacturer(manufacturerId) {
        return $http.get("/api/fleet/manufacturerget", { params: { "manufacturerId": manufacturerId } })
            .success(function (data) {
                angular.extend(service.currentManufacturer, data);
            })
    }


    function saveVehicle(model) {
        return $http.post("/api/fleet/vehiclesave", model)
            .success(function (data) {
                //updating the vehicle
                service.vehicle.RegistrationNumber = model.RegistrationNumber;
                service.vehicle.VehicleType = model.VehicleType;
                service.vehicle.Manufacturer = model.Manufacturer;
                service.vehicle.VehicleModel = model.VehicleModel;
            });
    }

    function saveManufacturer(model) {
        return $http.post("/api/fleet/ManufacturerSave", model)
            .success(function (data) {
                //updating the vehicle
                //service.vehicle.RegistrationNumber = model.RegistrationNumber;
                //service.vehicle.VehicleType = model.VehicleType;
            });
    }

    function getVehicleType() {
        return $http.get("/api/fleet/vehicletypelistget")
            .success(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.vehicleTypes.splice(0, service.vehicleTypes.length);
                angular.extend(service.vehicleTypes, data);
            })
    }

    function saveVehicleType(model) {
        return $http.post("/api/fleet/vehicletypesave", model);
    }

    function getDrivers() {
        return $http.get("/api/fleet/driversget")
            .success(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.drivers.splice(0, service.drivers.length);
                angular.extend(service.drivers, data);
            })
    }

    function saveDriver(model) {
        return $http.post("/api/fleet/driversave", model);
    }

    function getSparePartList()
    {
        return $http.get("/api/fleet/sparepartlistget")
            .success(function (data) {
                //in order to refresh the grid, we need to remove all the elements and readd them
                service.sparePartList.splice(0, service.sparePartList.length);
                angular.extend(service.sparePartList, data);
            })
    }
    function getCurrentSparePart(sparePartId) {
        return $http.get("/api/fleet/sparepartget", { params: { "sparePartId": sparePartId } })
            .success(function (data) {
                angular.extend(service.currentSparePart, data);
            })
    }

    function saveSparePart(model) {
        return $http.post("/api/fleet/sparepartsave", model)
            .success(function (data) {
                //updating the spare part
                service.sparePart.Name = model.Name;
                service.sparePart.Description = model.Description;
            });
    }

    function getSparePart(sparePartId) {
        return $http.get("/api/fleet/sparepartdetailsget", { params: { "sparePartId": sparePartId } })
            .success(function (data) {
                service.sparePart = data
            })
    }

    function getCurrentSparePartOrder(sparePartOrderId) {
        return $http.get("/api/fleet/sparepartorderget", { params: { "sparePartOrderId": sparePartOrderId } })
            .success(function (data) {
                angular.extend(service.currentSparePartOrder, data);
                service.currentSparePartOrder.OrderedUTCdatetime = new Date(service.currentSparePartOrder.OrderedUTCdatetime);
            })
    }

    function saveSparePartOrder(model) {
        return $http.post("/api/fleet/sparepartorderSave", model);
    }

}
