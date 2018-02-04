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
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";
import * as _ from "lodash";
import { CoinsDataProvider } from "../../providers/coins-data/coins-data";
import { Storage } from "@ionic/storage";
import { Content } from "ionic-angular";
/**
 * Generated class for the CoinsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CoinsListPage = /** @class */ (function () {
    function CoinsListPage(navCtrl, navParams, CoinsDataProvider, loading, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.CoinsDataProvider = CoinsDataProvider;
        this.loading = loading;
        this.storage = storage;
        this.coins = [];
        this.coinsClone = [];
        this.favCoins = [];
        this.filteredCoins = [];
        this.assetsFolder = "assets/fonts/SVG/";
        this.searchCoinsQuery = "";
        this.showSearchBar = false;
        this.defaultCoinListView = "all";
        this.storedFavCoinSymbols = [];
        this.rankSortOrder = "desc";
        this.rankEnabled = true;
        this.percentSortOrder = "desc";
    }
    CoinsListPage.prototype.ionViewDidLoad = function () {
        //console.log('ionViewDidLoad CoinsListPage');
        var _this = this;
        // define loader configs
        var loader = this.loading.create({
            content: "Please wait..."
        });
        // present loader
        loader.present().then(function () {
            _this.doApiCall(function () {
                _this.coinsClone = _this.coins;
                // dismiss loader
                loader.dismiss();
            });
        });
        // important - to set the fav icon enabled in 'all' list
        this.getFavCoinSymbolsFromStorage();
    };
    // make provider call
    CoinsListPage.prototype.doApiCall = function (successCb, errorCb, finalCb) {
        var _this = this;
        this.CoinsDataProvider.getCoins().subscribe(function (data) {
            _this.coins = data;
            if (successCb) {
                successCb();
            }
        }, function (error) {
            console.log("something went wrong");
            if (errorCb) {
                errorCb();
            }
        }, function () {
            if (finalCb) {
                finalCb();
            }
        });
    };
    // go to details page
    CoinsListPage.prototype.onCoinListItemTap = function (event, coin) {
        //console.log(coin);
    };
    // page pull down refresh
    CoinsListPage.prototype.doRefresh = function (refresher) {
        var _this = this;
        this.doApiCall(function () {
            _this.coinListViewChanged("fav");
            refresher.complete();
        });
    };
    // search bar list filtering
    CoinsListPage.prototype.doFilterCoins = function (event) {
        var input = this.searchCoinsQuery.toLowerCase();
        this.coins = _.filter(this.coinsClone, function (coin) {
            var coinName = coin.long.toLowerCase();
            var coinSmbol = coin.short.toLowerCase();
            return (coinName.indexOf(input) > -1 || coinSmbol.indexOf(input) > -1);
        });
    };
    // cancel search
    CoinsListPage.prototype.onSearchCancel = function () {
        this.coins = this.coinsClone;
    };
    // show/hide search bar
    CoinsListPage.prototype.doToggleSearchBar = function () {
        this.showSearchBar = !this.showSearchBar;
        this.content.resize();
    };
    // open settings menu
    CoinsListPage.prototype.doOpenSettings = function () {
        console.log("settings");
    };
    // add/remove to/from fav
    CoinsListPage.prototype.toggleFavorite = function (coin) {
        // remove from favorites
        var _this = this;
        this.getFavCoinSymbolsFromStorage().then(function (favCoinsArr) {
            if (_.includes(favCoinsArr, coin.short)) {
                _this.doRemoveFromFavorites(coin);
            }
            else {
                // add to favorites
                _this.getFavCoinSymbolsFromStorage().then(function (favCoinsArr) {
                    if (!(favCoinsArr && favCoinsArr.length)) {
                        favCoinsArr = [];
                    }
                    if (!_.includes(favCoinsArr, coin.short)) {
                        favCoinsArr.push(coin.short);
                        _this.setFavCoinSymbolsToStorage(favCoinsArr);
                    }
                });
            }
        });
    };
    // remove from favorites
    CoinsListPage.prototype.doRemoveFromFavorites = function (coin) {
        var _this = this;
        this.getFavCoinSymbolsFromStorage().then(function (favCoinsArr) {
            if (favCoinsArr && favCoinsArr.length) {
                _.remove(favCoinsArr, function (i) {
                    return i === coin.short;
                });
                _this.setFavCoinSymbolsToStorage(favCoinsArr).then(function (favCoinsArr) {
                    _this.coinListViewChanged("fav");
                });
            }
        });
    };
    // retrieve symbols
    CoinsListPage.prototype.getFavCoinSymbolsFromStorage = function () {
        var _this = this;
        var favStorage = this.storage.get("favCoins");
        favStorage.then(function (favCoinsArr) {
            if (favCoinsArr && favCoinsArr.length) {
                _this.storedFavCoinSymbols = favCoinsArr;
            }
        });
        return favStorage;
    };
    // store
    CoinsListPage.prototype.setFavCoinSymbolsToStorage = function (favCoinsArr) {
        return this.storage.set("favCoins", favCoinsArr);
    };
    // returns coin object from symbol
    CoinsListPage.prototype.getFullObjectFromSymbol = function (symbol) {
        return _.find(this.coinsClone, ["short", symbol]);
    };
    // returns if coin is in favs
    CoinsListPage.prototype.isCoinInFavs = function (symbol, checkFromStorage) {
        if (checkFromStorage) {
            this.getFavCoinSymbolsFromStorage().then(function (favCoinsArr) {
                if (favCoinsArr && favCoinsArr.length) {
                    console.log(favCoinsArr);
                    return _.includes(favCoinsArr, symbol);
                }
            });
        }
        else {
            return _.includes(this.storedFavCoinSymbols, symbol);
        }
    };
    // segement switch event
    CoinsListPage.prototype.coinListViewChanged = function (val) {
        var _this = this;
        if (val === "fav") {
            this.favCoins = [];
            this.getFavCoinSymbolsFromStorage().then(function (favCoinsArr) {
                if (favCoinsArr && favCoinsArr.length) {
                    _.forEach(favCoinsArr, function (symbol) {
                        var coinObj = _this.getFullObjectFromSymbol(symbol);
                        _this.favCoins.push(coinObj);
                        _this.sortBy("rank", _this.rankSortOrder);
                    });
                }
            });
        }
    };
    CoinsListPage.prototype.sortBy = function (base, sortOrder) {
        sortOrder = sortOrder === "asc" ? "desc" : "asc";
        switch (base) {
            case "rank":
                this.rankEnabled = true;
                this.rankSortOrder = sortOrder;
                if (this.defaultCoinListView == "all") {
                    this.coins = this.coins.reverse();
                }
                else {
                    this.favCoins = this.favCoins.reverse();
                }
                break;
            case "changePercent":
                this.rankEnabled = false;
                this.percentSortOrder = sortOrder;
                break;
        }
    };
    __decorate([
        ViewChild("content"),
        __metadata("design:type", Content)
    ], CoinsListPage.prototype, "content", void 0);
    CoinsListPage = __decorate([
        IonicPage(),
        Component({
            selector: "page-coins-list",
            templateUrl: "coins-list.html"
        }),
        __metadata("design:paramtypes", [NavController,
            NavParams,
            CoinsDataProvider,
            LoadingController,
            Storage])
    ], CoinsListPage);
    return CoinsListPage;
}());
export { CoinsListPage };
//# sourceMappingURL=coins-list.js.map