import { Component, ViewChild, Content } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';
import { CoinsDataProvider } from '../../providers/coins-data/coins-data';

/**
 * Generated class for the CoinsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-coins-list',
  templateUrl: 'coins-list.html',
})
export class CoinsListPage {

	coins: any[] = [];
	coinsClone: any[] = []; 
	favCoins: any[] = [];
	filteredCoins: any[] = []; 
	assetsFolder: string = 'assets/fonts/SVG/';
	searchCoinsQuery: string = '';
	showSearchBar: boolean = false;
	defaultCoinListView: string = 'all';

	@ViewChild('content') content: Content;

  constructor( public navCtrl: NavController, public navParams: NavParams, public CoinsDataProvider: CoinsDataProvider, public loading: LoadingController) {
  		this.doApiCall();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad CoinsListPage');

    // define loader configs
    let loader = this.loading.create({
		content: 'Please wait...',
	});

    // present loader
  	loader.present().then(() => {
  		this.doApiCall(() => {
  			this.coinsClone = this.coins;
  			// TODO: make below one dynamic
  			this.favCoins = [this.coins[0]];
  			// dismiss loader
	      	loader.dismiss();
  		});
	  });
  }

  // make provider call
  doApiCall(successCb?: Function, errorCb?: Function, finalCb?: Function ) {
  	this.CoinsDataProvider.getCoins().subscribe((data) => {
	      this.coins = data;
	      if(successCb) {
	      	successCb();
	      }
	    },
	    error => {
        	console.log("something went wrong");
        	if(errorCb) {
        		errorCb();
        	}
	    },
	    () => {
	    	if(finalCb) {
	       		finalCb();
	    	}
	    });
  }

  // go to details page
  onCoinListItemTap(event, coin): void {
    console.log(coin);
  }

  // page pull down refresh
  doRefresh(refresher): void {
  	this.doApiCall(() => {
		refresher.complete();
	});
  }

  // search bar list filtering
  doFilterCoins(event) : void {
  	var input = this.searchCoinsQuery;

	this.coins = _.filter(this.coinsClone, function(coin): boolean {
		var coinName = coin.long.toLowerCase();
		var coinSmbol = coin.short.toLowerCase();
		return (coinName.indexOf(input) > -1 || coinSmbol.indexOf(input) > -1);
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
  	console.log('settings');
  }


}
