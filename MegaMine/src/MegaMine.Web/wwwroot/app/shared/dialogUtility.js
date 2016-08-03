var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MegaMine;
(function (MegaMine) {
    var Shared;
    (function (Shared) {
        "use strict";
        var DialogUtility = (function () {
            function DialogUtility($mdDialog) {
                this.$mdDialog = $mdDialog;
            }
            DialogUtility.prototype.alert = function (title, content, ev) {
                var self = this;
                self.$mdDialog.show(self.$mdDialog.alert()
                    .parent(angular.element(document.body))
                    .title(title)
                    .textContent(content)
                    .ariaLabel(title)
                    .ok("Ok")
                    .targetEvent(ev));
            };
            DialogUtility.prototype.confirm = function (title, content, ev) {
                var self = this;
                var dialog = self.$mdDialog.confirm()
                    .parent(angular.element(document.body))
                    .title(title)
                    .textContent(content)
                    .ariaLabel(title)
                    .ok("Yes")
                    .cancel("No")
                    .targetEvent(ev);
                return self.$mdDialog.show(dialog);
            };
            DialogUtility = __decorate([
                MegaMine.service("megamine", "MegaMine.Shared.DialogUtility"),
                MegaMine.inject("$mdDialog")
            ], DialogUtility);
            return DialogUtility;
        }());
        Shared.DialogUtility = DialogUtility;
    })(Shared = MegaMine.Shared || (MegaMine.Shared = {}));
})(MegaMine || (MegaMine = {}));
//# sourceMappingURL=DialogUtility.js.map