var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Quarry;
    (function (Quarry) {
        "use strict";
        var Yard = (function () {
            function Yard(quarryService, utility, dialogService) {
                this.quarryService = quarryService;
                this.utility = utility;
                this.dialogService = dialogService;
                var self = this;
                self.init();
            }
            Yard.prototype.init = function () {
                var self = this;
                var gridOptions = {
                    columnDefs: [
                        { name: 'yardName', field: 'yardName', displayName: 'Name', type: 'string' },
                        { name: 'location', field: 'location', type: 'string', displayName: 'Location' }
                    ]
                };
                self.dashboard = {
                    header: 'Yards',
                    context: self,
                    widgets: {
                        allWidgets: self.quarryService.yards.widgets.allWidgets,
                        pageWidgets: self.quarryService.yards.widgets.pageWidgets,
                    },
                    records: {
                        options: {
                            primaryField: 'yardId',
                            data: self.quarryService.yards.list,
                            view: self.viewDialog
                        },
                        list: {
                            options: {
                                fields: ['yardName', 'location'],
                            },
                        },
                        grid: {
                            options: gridOptions,
                        },
                        buttons: {
                            options: {
                                hideGridButtons: 'row.entity.quarryId !== null'
                            },
                            add: {
                                text: 'New',
                                toolTip: 'New Yard',
                                claim: 'Quarry:YardAdd,Plant:YardAdd',
                                save: self.addYard,
                            },
                            edit: {
                                claim: 'Quarry:YardEdit,Plant:YardEdit'
                            },
                            delete: {
                                claim: 'Quarry:YardDelete,Plant:YardDelete'
                            }
                        }
                    }
                };
            };
            Yard.prototype.addYard = function (ev, context) {
                var self = context;
                var model = { yardId: 0 };
                self.viewDialog(model, 1 /* save */, ev, context);
            };
            Yard.prototype.viewDialog = function (model, dialogMode, ev, context) {
                var self = context;
                self.dialogService.show({
                    templateUrl: 'yard_dialog',
                    targetEvent: ev,
                    data: { model: model },
                    dialogMode: dialogMode
                })
                    .then(function (dialogModel) {
                    if (dialogMode === 2 /* delete */) {
                        self.quarryService.deleteYard(dialogModel.yardId).then(function () {
                            self.quarryService.getYards();
                            self.dialogService.hide();
                        });
                    }
                    else {
                        self.quarryService.saveYard(dialogModel).then(function () {
                            //update the grid values
                            if (dialogModel.yardId === 0) {
                                self.quarryService.getYards();
                            }
                            else {
                                model.yardName = dialogModel.yardName;
                                model.location = dialogModel.location;
                            }
                            self.dialogService.hide();
                        });
                    }
                });
            };
            Yard = __decorate([
                MegaMine.controller("megamine", "MegaMine.Quarry.Yard"),
                MegaMine.inject("quarryService", "MegaMine.Shared.Utility", "MegaMine.Shared.DialogService")
            ], Yard);
            return Yard;
        }());
        Quarry.Yard = Yard;
    })(Quarry = MegaMine.Quarry || (MegaMine.Quarry = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=Yard.js.map