﻿using MegaMine.Web.Lib.Repositories;
using MegaMine.Web.Lib.Repositories.Fleet;
using MegaMine.Web.Models;
using MegaMine.Web.Models.Fleet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MegaMine.Web.Lib.Entities;
using MegaMine.Core.Models;

namespace MegaMine.Web.Lib.Domain
{
    public class FleetDomain
    {
        private VehicleRepository vehicleRepository;
        //private SparePartRepository sparepartRepository;
        public FleetDomain(VehicleRepository vehicleRepository)
        {
            this.vehicleRepository = vehicleRepository;
            //this.sparepartRepository = sparepartRepository;
        }

        public async Task<List<VehicleListModel>> VehicleList()
        {
            return await vehicleRepository.VehicleListGet();
        }


        public async Task<List<VehicleTypeModel>> VehicleTypeListGet()
        {
            return await vehicleRepository.VehicleTypeListGet();
        }

        //public async Task<List<SparePartModel>> SparePartListGet()
        //{
        //    return await sparepartRepository.SparePartListGet();
        //}

        //public async Task <SparePartDetailsModel> SparePartDetailsGet(int sparePartId)
        //{
        //   return   await sparepartRepository.SparePartDetailsGet(sparePartId, vehicleRepository);
        //}

        public async Task <ManufacturerDetailsModel> ManufacturerDetailsGet(int manufacturerId)
        {
            return await vehicleRepository.ManufacturerDetailsGet(manufacturerId);
        }



        //public async Task <SparePartModel> SparePartGet(int sparePartId)
        //{
        //    return await sparepartRepository.SparePartGet(sparePartId, vehicleRepository);
        //}

        //public async Task  SparePartSave(SparePartModel model)
        //{
        //   await sparepartRepository.SparePartSave(model);
        //}

        public async Task <VehicleModel> VehicleGet(int vehicleId)
        {
            return await vehicleRepository.VehicleGet(vehicleId);
        }

        public async Task VehicleFuelReset(int vehicleId)
        {
            await vehicleRepository.VehicleFuelReset(vehicleId);
        }               

        public async Task  VehicleSave(VehicleModel model)
        {
          await vehicleRepository.VehicleSave(model);
        }

        public async Task  ModelSave(VehicleManufactureModelModel model)
        {
            await vehicleRepository.ModelSave(model);
        }

        //public async Task <VehicleTypeModel> VehicleTypeGet(int vehicleTypeId)
        //{
        //    return await vehicleRepository.VehicleTypeGet(vehicleTypeId);
        //}

        public async Task VehicleTypeSave(VehicleTypeModel model)
        {
            await vehicleRepository.VehicleTypeSave(model);
        }

        public async Task  DriverSave(VehicleDriverModel model)
        {
           await vehicleRepository.DriverSave(model);
        }

        public async Task<List<VehicleManufacturerModel>> VehicleManufacturersGet()
        {
            return await vehicleRepository.VehicleManufacturersGet();
        }

        public async Task VehicleManufacturerSave(VehicleManufacturerModel  model)
        {
           await vehicleRepository.VehicleManufacturerSave(model);
        }

        public async Task VehicleFuelSave(FuelModel model)
        {
           await vehicleRepository.FuelSave(model);
        }

        //public async Task SparePartManufacturerSave(SparePartManufacturerModel model)
        //{
        //  await sparepartRepository.SparePartManufacturerModelSave(model);
        //}

        public async Task  ManufacturerSave(VehicleManufacturerModel model)
        {
           await vehicleRepository.VehicleManufacturerSave(model);
        }

        public async Task <VehicleManufacturerModel> VehicleManufacturerGet(int manufacturerId)
        {
            return await vehicleRepository.VehicleManufacturerGet(manufacturerId);
        }

        //public async Task <SparePartOrderModel> SparePartOrderGet(int sparePartOrderId)
        //{
        //    return await sparepartRepository.SparePartOrderGet(sparePartOrderId);
        //}

        //public async Task  SparePartOrderSave(SparePartOrderModel model)
        //{
        //  await  sparepartRepository.SparePartOrderSave(model);
        //}

        public async Task<VehicleDetailsModel> VehicleDetailsGet(int vehicleId)
        {
            return await vehicleRepository.VehicleDetailsGet(vehicleId);
        }

        public async Task <VehicleDetailsModel> VehicleServiceSave(VehicleServiceModel model)
        {
            //calculating the total cost
            model.TotalServiceCost = model.MiscServiceCost;

            return await  vehicleRepository.VehicleServiceSave(model);
        }

        public async Task <VehicleServiceModel> VehicleServiceGet(int vehicleServiceId)
        {
            return await vehicleRepository.VehicleServiceGet(vehicleServiceId);
        }

        public async Task<List<VehicleServiceModel>> VehicleServiceReportGet(int vehicleServiceId, DateTime StartDate, DateTime EndDate)
        {
            return await vehicleRepository.VehicleServiceReportGet( vehicleServiceId,  StartDate,  EndDate);
        }

        public async Task<List<VehicleDriverModel>> DriversGet()
        {
            return await vehicleRepository.DriversGet();
        }

        public async Task<List<FuelModel>> FuelGetList(int vehicleId)
        {
            return await vehicleRepository.FuelGetList(vehicleId);
        }

        public async Task  FuelSave(FuelModel model)
        {
          await vehicleRepository.FuelSave(model);
        }

        public async Task<List<VehicleDriverAssignmentModel>> VehicleDriverGetList(int vehicleId)
        {
            return await vehicleRepository.VehicleDriverAssignmentGetList(vehicleId);
        }

        public async Task<List<ListItem<int, string>>> DriversListGet()
        {
            return await vehicleRepository.DriversListGet();
        }
        //public async Task<List<ListItem<int, string>>> VehicleTripListItemGet(int VehicleId = 0)
        //{
        //    return await vehicleRepository.VehicleTripListItemGet(VehicleId);
        //}

        public async Task<List<VehicleTripModel>> VehicleTripListGet(int vehicleId)
        {
            return await vehicleRepository.VehicleTripListGet(vehicleId);
        }
        
        public async Task VehicleTripSave(VehicleTripModel model)
        {
          await vehicleRepository.VehicleTripSave(model);
        }

        internal async Task  VehicleDriverSave(VehicleDriverAssignmentModel model)
        {
          await  vehicleRepository.VehicleDriverSave(model);
        }
    }
}
