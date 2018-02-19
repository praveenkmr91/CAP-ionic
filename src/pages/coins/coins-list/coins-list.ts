import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams, Content } from "ionic-angular";
import * as _ from "lodash";
import { Storage } from "@ionic/storage";
import { CoinsDataProvider } from "../../../providers/coins-data/coins-data";
import { CoinDetailPage } from "../../../pages/coins/coin-detail/coin-detail";

import { AppUtility } from "../../../shared/utils/app-utility/app-utility";

/**
 * Generated class for the CoinsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-coins-list",
	templateUrl: "coins-list.html"
})
export class CoinsListPage {
	coinsList: any = [];
	coinsListClone: any = [];
	favCoinsList: any = [];
	filteredCoins: any = [];
	assetsFolder: string = "assets/fonts/SVG/";
	searchQuery: string = "";
	showSearchBar: boolean = false;
	defaultCoinListView: string = "all";
	storedFavCoinSymbols: any = [];
	allowRefresh: boolean = true;

	rankEnabled: boolean = true;
	rankSortOrder: string = "desc";
	percentSortOrder: string = "desc";

	@ViewChild("content") content: Content;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public CoinsDataProvider: CoinsDataProvider,
		public storage: Storage,
		public AppUtility: AppUtility
	) {}

	ionViewDidLoad() {
		//this.AppUtility.log('ionViewDidLoad CoinsListPage');

		this.AppUtility.showLoadingMask(() => {
			this.doApiCall(() => {
				this.coinsListClone = this.coinsList;
			});
		});

		// important - to set the fav icon enabled in 'all' list
		this.getFavCoinSymbolsFromStorage();
	}

	// make provider call
	doApiCall(successCb?: Function, errorCb?: Function, finalCb?: Function) {
		this.CoinsDataProvider.getCoins().subscribe(
			data => {
				this.coinsList = data;
				if (successCb) {
					successCb();
				}
			},
			error => {
				this.AppUtility.log("something went wrong");
				if (errorCb) {
					errorCb();
				}
			},
			() => {
				if (finalCb) {
					finalCb();
				}
			}
		);
	}

	// go to details page
	onCoinListItemTap(event, coin): void {
		//this.AppUtility.log(coin);
	}

	// page pull down refresh
	doRefresh(refresher): void {
		this.doApiCall(() => {
			this.coinListViewChanged("fav");
			refresher.complete();
		});
	}

	// search bar list filtering
	doFilterCoins(event): void {
		var input = this.searchQuery.toLowerCase();

		this.coinsList = _.filter(this.coinsListClone, function(coin): boolean {
			var coinName = coin.long.toLowerCase();
			var coinSmbol = coin.short.toLowerCase();
			return (
				coinName.indexOf(input) > -1 || coinSmbol.indexOf(input) > -1
			);
		});
	}

	// cancel search
	onSearchCancel(): void {
		this.coinsList = this.coinsListClone;
	}

	// show/hide search bar
	doToggleSearchBar(): void {
		this.showSearchBar = !this.showSearchBar;
		this.content.resize();
	}

	// open settings menu
	doOpenSettings(): void {
		this.AppUtility.log("settings");
	}

	// add/remove to/from fav
	toggleFavorite(coin: any): void {
		// remove from favorites

		this.getFavCoinSymbolsFromStorage().then(favCoinsArr => {
			if (_.includes(favCoinsArr, coin.short)) {
				this.doRemoveFromFavorites(coin);
			} else {
				// add to favorites
				this.getFavCoinSymbolsFromStorage().then(favCoinsArr => {
					if (!(favCoinsArr && favCoinsArr.length)) {
						favCoinsArr = [];
					}
					if (!_.includes(favCoinsArr, coin.short)) {
						favCoinsArr.push(coin.short);
						this.setFavCoinSymbolsToStorage(favCoinsArr);
					}
				});
			}
		});
	}

	// remove from favorites
	doRemoveFromFavorites(coin: any) {
		this.getFavCoinSymbolsFromStorage().then(favCoinsArr => {
			if (favCoinsArr && favCoinsArr.length) {
				_.remove(favCoinsArr, i => {
					return i === coin.short;
				});
				this.setFavCoinSymbolsToStorage(favCoinsArr).then(
					favCoinsArr => {
						this.coinListViewChanged("fav");
					}
				);
			}
		});
	}

	// retrieve symbols
	getFavCoinSymbolsFromStorage(): any {
		let favStorage = this.storage.get("favCoinsList");
		favStorage.then(favCoinsArr => {
			if (favCoinsArr && favCoinsArr.length) {
				this.storedFavCoinSymbols = favCoinsArr;
			}
		});
		return favStorage;
	}

	// store
	setFavCoinSymbolsToStorage(favCoinsArr: any): any {
		return this.storage.set("favCoinsList", favCoinsArr);
	}

	// returns coin object from symbol
	getFullObjectFromSymbol(symbol: string): void {
		return _.find(this.coinsListClone, ["short", symbol]);
	}

	// returns if coin is in favs
	isCoinInFavs(symbol: string, checkFromStorage: boolean): boolean {
		if (checkFromStorage) {
			this.getFavCoinSymbolsFromStorage().then(favCoinsArr => {
				if (favCoinsArr && favCoinsArr.length) {
					this.AppUtility.log(favCoinsArr);
					return _.includes(favCoinsArr, symbol);
				}
			});
		} else {
			return _.includes(this.storedFavCoinSymbols, symbol);
		}
	}

	// segement switch event
	coinListViewChanged(val: string): void {
		if (val === "fav") {
			this.favCoinsList = [];
			this.getFavCoinSymbolsFromStorage().then(favCoinsArr => {
				if (favCoinsArr && favCoinsArr.length) {
					_.forEach(favCoinsArr, symbol => {
						let coinObj = this.getFullObjectFromSymbol(symbol);
						this.favCoinsList.push(coinObj);
						//this.sortBy("rank", this.rankSortOrder, true);
					});
				}
			});
		} else {
			//this.sortBy("rank", this.rankSortOrder, true);
		}
	}

	sortBy(base: string, sortOrder: string, useGivenSortOrder?: boolean): void {
		if (!useGivenSortOrder) {
			sortOrder = sortOrder === "asc" ? "desc" : "asc";
		}
		switch (base) {
			case "rank":
				this.rankEnabled = true;
				this.rankSortOrder = sortOrder;
				if (this.defaultCoinListView == "all") {
					this.coinsList = this.coinsList.reverse();
				} else {
					this.favCoinsList = this.favCoinsList.reverse();
				}
				break;
			case "changePercent":
				this.rankEnabled = false;
				this.percentSortOrder = sortOrder;
				break;
		}
	}

	onCoinTap(symbol) {
		this.navCtrl.push(CoinDetailPage, {
			symbol: symbol
		});
	}
}
