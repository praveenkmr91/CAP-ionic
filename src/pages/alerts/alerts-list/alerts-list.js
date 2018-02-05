var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Content, LoadingController } from "ionic-angular";
import { Storage } from "@ionic/storage";
//import { AlertsDataProvider } from "../../../providers/alerts-data/alerts-data";
/**
 * Generated class for the AlertsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var AlertsListPage = /** @class */ (function () {
    function AlertsListPage(navCtrl, navParams, loading, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loading = loading;
        this.storage = storage;
        this.showSearchBar = false;
    }
    AlertsListPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad AlertsListPage");
        // define loader configs
        var loader = this.loading.create({
            content: "Please wait..."
        });
        // present loader
        loader.present().then(function () {
            // get alerts data from storage
            loader.dismiss();
        });
    };
    // show/hide search bar
    AlertsListPage.prototype.doToggleSearchBar = function () {
        this.showSearchBar = !this.showSearchBar;
        this.content.resize();
    };
    AlertsListPage.prototype.doOpensettings = function () {
        console.log("settings");
    };
    __decorate([
        ViewChild("content"),
        __metadata("design:type", Content)
    ], AlertsListPage.prototype, "content", void 0);
    AlertsListPage = __decorate([
        IonicPage(),
        Component({
            selector: "page-alerts-list",
            templateUrl: "alerts-list.html"
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            LoadingController,
            Storage])
    ], AlertsListPage);
    return AlertsListPage;
}());
export { AlertsListPage };
//# sourceMappingURL=alerts-list.js.map