import { Component, ViewChild } from "@angular/core";
import {
	IonicPage,
	NavController,
	NavParams,
	LoadingController,
	Content
} from "ionic-angular";
import * as _ from "lodash";
import { Storage } from "@ionic/storage";
import { CoinsDataProvider } from "../../../providers/coins-data/coins-data";

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
	coins: any = [];
	coinsClone: any = [];
	favCoins: any = [];
	filteredCoins: any = [];
	assetsFolder: string = "assets/fonts/SVG/";
	searchQuery: string = "";
	showSearchBar: boolean = false;
	defaultCoinListView: string = "all";
	storedFavCoinSymbols: any = [];

	rankEnabled: boolean = true;
	rankSortOrder: string = "desc";
	percentSortOrder: string = "desc";

	@ViewChild("content") content: Content;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public CoinsDataProvider: CoinsDataProvider,
		public loading: LoadingController,
		public storage: Storage
	) {}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad CoinsListPage');

		// define loader configs
		let loader = this.loading.create({
			content: "Please wait..."
		});

		// present loader
		loader.present().then(() => {
			this.doApiCall(() => {
				this.coinsClone = this.coins;
				// dismiss loader
				loader.dismiss();
			});
		});

		// important - to set the fav icon enabled in 'all' list
		this.getFavCoinSymbolsFromStorage();
	}

	// make provider call
	doApiCall(successCb?: Function, errorCb?: Function, finalCb?: Function) {
		this.CoinsDataProvider.getCoins().subscribe(
			data => {
				this.coins = data;
				if (successCb) {
					successCb();
				}
			},
			error => {
				console.log("something went wrong");
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
		//console.log(coin);
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

		this.coins = _.filter(this.coinsClone, function(coin): boolean {
			var coinName = coin.long.toLowerCase();
			var coinSmbol = coin.short.toLowerCase();
			return (
				coinName.indexOf(input) > -1 || coinSmbol.indexOf(input) > -1
			);
		});
	}

	// cancel search
	onSearchCancel(): void {
		this.coins = this.coinsClone;
	}

	// show/hide search bar
	doToggleSearchBar(): void {
		this.showSearchBar = !this.showSearchBar;
		this.content.resize();
	}

	// open settings menu
	doOpenSettings(): void {
		console.log("settings");
	}

	// add/remove to/from fav
	toggleFavorite(coin: any): void {
		// remove from favorites

		this.getFavCoinSymbolsFromStorage().then(favCoinsArr => {
			debugger;
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
		let favStorage = this.storage.get("favCoins");
		favStorage.then(favCoinsArr => {
			if (favCoinsArr && favCoinsArr.length) {
				this.storedFavCoinSymbols = favCoinsArr;
			}
		});
		return favStorage;
	}

	// store
	setFavCoinSymbolsToStorage(favCoinsArr: any): any {
		return this.storage.set("favCoins", favCoinsArr);
	}

	// returns coin object from symbol
	getFullObjectFromSymbol(symbol: string): void {
		return _.find(this.coinsClone, ["short", symbol]);
	}

	// returns if coin is in favs
	isCoinInFavs(symbol: string, checkFromStorage: boolean): boolean {
		if (checkFromStorage) {
			this.getFavCoinSymbolsFromStorage().then(favCoinsArr => {
				if (favCoinsArr && favCoinsArr.length) {
					console.log(favCoinsArr);
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
			this.favCoins = [];
			this.getFavCoinSymbolsFromStorage().then(favCoinsArr => {
				if (favCoinsArr && favCoinsArr.length) {
					_.forEach(favCoinsArr, symbol => {
						let coinObj = this.getFullObjectFromSymbol(symbol);
						this.favCoins.push(coinObj);
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
					this.coins = this.coins.reverse();
				} else {
					this.favCoins = this.favCoins.reverse();
				}
				break;
			case "changePercent":
				this.rankEnabled = false;
				this.percentSortOrder = sortOrder;
				break;
		}
	}
}
