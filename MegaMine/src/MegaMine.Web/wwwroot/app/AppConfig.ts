﻿module MegaMine.App {

    @config("megamine")
    export class Config {
        static $inject = ["$provide", "$httpProvider", "$mdThemingProvider"];
        constructor($provide: angular.auto.IProvideService, $httpProvider: ng.IHttpProvider
                                , $mdThemingProvider: ng.material.IThemingProvider) {
            // add the interceptor to the $httpProvider.
            $httpProvider.interceptors.push("apiInterceptor");
            $httpProvider.useLegacyPromiseExtensions(false);

            $mdThemingProvider.theme("default")
                .primaryPalette("grey");

            $provide.decorator("GridOptions", ["$delegate", function ($delegate: uiGrid.IGridOptions): uiGrid.IGridOptions {
                let gridOptions: uiGrid.IGridOptions = angular.copy($delegate);
                gridOptions.initialize = function (options: uiGrid.IGridOptions): uiGrid.IGridOptions {
                    let initOptions: uiGrid.IGridOptions = $delegate.initialize(options);
                    angular.extend(initOptions, {
                        enableGridMenu: true, exporterMenuCsv: true, exporterMenuPdf: true,
                        gridMenuShowHideColumns: true
                    });
                    return initOptions;
                };
                return gridOptions;
            }]);
        }
    }
}
