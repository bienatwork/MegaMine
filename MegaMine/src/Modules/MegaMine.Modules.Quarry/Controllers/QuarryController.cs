﻿using MegaMine.Core.Helpers.Web;
using MegaMine.Core.Models;
using MegaMine.Core.Models.Web;
using MegaMine.Modules.Quarry.Common;
using MegaMine.Modules.Quarry.Domain;
using MegaMine.Modules.Quarry.Models;
using MegaMine.Services.Security.Domain;
using MegaMine.Services.Widget.Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MegaMine.Modules.Quarry.Controllers
{
    public class QuarryController : Controller
    {
        private QuarryDomain domain;
        private QuarryDashboardDomain dashboardDomain;
        private WidgetDomain widgetDomain;
        public QuarryController(QuarryDomain domain, QuarryDashboardDomain dashboardDomain, WidgetDomain widgetDomain)
        {
            this.domain = domain;
            this.dashboardDomain = dashboardDomain;
            this.widgetDomain = widgetDomain;
        }

        [HttpGet]
        public async Task<AjaxModel<object>> Dashboard()
        {
            return await AjaxHelper.GetDashboardAsync(dashboardDomain, widgetDomain);
        }


        #region Material Colour
        [HttpGet]
        public async Task<AjaxModel<List<ListItem<int, string>>>> MaterialColourListItemsGet()
        {
            return await AjaxHelper.GetAsync(m => domain.MaterialColourListItemsGet());
        }

        [HttpGet]
        public async Task<AjaxModel<List<MaterialColourModel>>> MaterialColoursGet()
        {
            return await AjaxHelper.GetDashboardAsync(m => domain.MaterialColoursGet(), dashboardDomain, widgetDomain);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> MaterialColourAdd([FromBody] MaterialColourModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.MaterialColourSave(model), QuarryMessages.MaterialColourSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> MaterialColourUpdate([FromBody] MaterialColourModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.MaterialColourSave(model), QuarryMessages.MaterialColourSaveSuccess);
        }
        [HttpPost]
        public async Task<AjaxModel<NTModel>> MaterialColourDelete([FromBody] int materialColourId)
        {
            return await AjaxHelper.SaveAsync(m => domain.MaterialColourDelete(materialColourId), QuarryMessages.MaterialColourDeleteSuccess);
        }
        #endregion

        #region Product Type

        [HttpGet]
        public async Task<AjaxModel<List<ProductTypeModel>>> ProductTypeListGet()
        {
            return await AjaxHelper.GetAsync(m => domain.ProductTypesGet());
        }

        [HttpGet]
        public async Task<AjaxModel<List<ProductTypeModel>>> ProductTypesGet()
        {
            return await AjaxHelper.GetDashboardAsync(m => domain.ProductTypesGet(), dashboardDomain, widgetDomain);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ProductTypeAdd([FromBody] ProductTypeModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.ProductTypeSave(model), QuarryMessages.ProductTypeSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ProductTypeUpdate([FromBody] ProductTypeModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.ProductTypeSave(model), QuarryMessages.ProductTypeSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> ProductTypeDelete([FromBody] int productTypeId)
        {
            return await AjaxHelper.SaveAsync(m => domain.ProductTypeDelete(productTypeId), QuarryMessages.ProductTypeDeleteSuccess);
        }
        #endregion

        #region Quarry
        [HttpGet]
        public async Task<AjaxModel<List<QuarryModel>>> QuarriesGet()
        {
            return await AjaxHelper.GetDashboardAsync(m => domain.QuarriesGet(), dashboardDomain, widgetDomain);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> QuarryAdd([FromBody] QuarryModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.QuarrySave(model), QuarryMessages.QuarrySaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> QuarryUpdate([FromBody] QuarryModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.QuarrySave(model), QuarryMessages.QuarrySaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> QuarryDelete([FromBody] int quarryId)
        {
            return await AjaxHelper.SaveAsync(m => domain.QuarryDelete(quarryId), QuarryMessages.QuarryDeleteSuccess);
        }
        #endregion

        #region Yard
        [HttpGet]
        public async Task<AjaxModel<List<YardModel>>> YardListGet()
        {
            return await AjaxHelper.GetAsync(m => domain.YardsGet());
        }

        [HttpGet]
        public async Task<AjaxModel<List<YardModel>>> YardsGet()
        {
            return await AjaxHelper.GetDashboardAsync(m => domain.YardsGet(), dashboardDomain, widgetDomain);
        }

        [HttpGet]
        public async Task<AjaxModel<List<YardModel>>> GroupYardsGet()
        {

            return await AjaxHelper.GetAsync(async (m) =>
                                        {
                                            AccountDomain accountDomain = HttpContext.RequestServices.GetRequiredService<AccountDomain>();
                                            var companies = await accountDomain.GetGroupCompanyIds();
                                            return await domain.YardsGet(companies);
                                        }
                                    );
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> YardAdd([FromBody] YardModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.YardSave(model), QuarryMessages.YardSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> YardUpdate([FromBody] YardModel model)
        {
            return await AjaxHelper.SaveAsync(m => domain.YardSave(model), QuarryMessages.YardSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> YardDelete([FromBody] int yardId)
        {
            return await AjaxHelper.SaveAsync(m => domain.YardDelete(yardId), QuarryMessages.YardDeleteSuccess);
        }
        #endregion

        #region Material

        [HttpGet]
        public async Task<AjaxModel<MaterialViewModel>> MaterialViewModelGet()
        {
            return await AjaxHelper.GetAsync(m => domain.MaterialViewModelGet());
        }

        [HttpPost]
        public async Task<AjaxModel<NTModel>> MaterialSave([FromBody] List<MaterialModel> models)
        {
            return await AjaxHelper.SaveAsync(m => domain.MaterialSave(models), QuarryMessages.MaterialSaveSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> MaterialDelete(int materialId, int yardId)
        {
            return await AjaxHelper.SaveGetAsync(m => domain.MaterialDelete(materialId, yardId), QuarryMessages.MaterialDeleteSuccess);
        }
        #endregion

        #region Stock & Material Movement

        [HttpGet]
        public async Task<AjaxModel<List<StockModel>>> StockGet(int yardId)
        {
            return await AjaxHelper.GetAsync(m => domain.StockGet(yardId));
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> MoveMaterial([FromBody] MaterialMovementModel model)
        {
            return await AjaxHelper.SaveGetAsync(m => domain.MoveMaterial(model), QuarryMessages.MaterialMovementSuccess);
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> MaterialUpdate([FromBody] MaterialModel model, int yardId)
        {
            return await AjaxHelper.SaveGetAsync(m => domain.MaterialUpdate(model, yardId), QuarryMessages.MaterialUpdateSuccess);
        }

        #endregion

        #region Reports
        //reports
        [HttpPost]
        public async Task<AjaxModel<string>> QuarrySummary([FromBody] QuarrySummarySearchModel search)
        {
            return await AjaxHelper.GetAsync(m => domain.QuarrySummary(search));
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> QuarrySummaryDetails([FromBody] QuarrySummarySearchModel search)
        {
            return await AjaxHelper.GetAsync(m => domain.QuarrySummaryDetails(search));
        }

        //product summary
        [HttpGet]
        public async Task<AjaxModel<ProductSummaryViewModel>> ProductSummary()
        {
            return await AjaxHelper.GetAsync(m => domain.ProductSummary());
        }

        [HttpPost]
        public async Task<AjaxModel<List<ProductSummaryModel>>> ProductSummarySearch([FromBody] ProductSummarySearchModel search)
        {
            return await AjaxHelper.GetAsync(m => domain.ProductSummarySearch(search));
        }

        [HttpPost]
        public async Task<AjaxModel<List<StockModel>>> ProductSummaryDetails([FromBody] ProductSummarySearchModel search)
        {
            return await AjaxHelper.GetAsync(m => domain.ProductSummaryDetails(search));
        }

        #endregion
    }
}