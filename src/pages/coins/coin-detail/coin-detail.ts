import { Component } from "@angular/core";
import {
	IonicPage,
	NavController,
	NavParams,
	LoadingController
} from "ionic-angular";

/**
 * Generated class for the CoinDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-coin-detail",
	templateUrl: "coin-detail.html"
})
export class CoinDetailPage {
	public symbol: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loading: LoadingController
	) {
		this.symbol = navParams.get("symbol");
	}

	ionViewDidLoad() {
		console.log("ionViewDidLoad CoinDetailPage");
	}

	ionViewDidEnter() {
		// define loader configs
		let loader = this.loading.create({
			content: "Please wait..."
		});

		// present loader
		loader.present().then(() => {
			// get coin details
			/*this.doProviderCall(() => {
				// dismiss loader
			});*/
			loader.dismiss();
		});
	}

	/*doProviderCall(
		successCb?: Function,
		errorCb?: Function,
		finalCb?: Function
	) {
		this.AlertsDataProvider.getAlertsData()
			.then(data => {
				this.alertsList = data;
				if (data && data.length) {
					this.doRefresh().then(() => {
						if (successCb) {
							successCb();
						}
					});
				} else {
					if (successCb) {
						successCb();
					}
				}
			})
			.catch(exception => {
				this.showToast("unable to fetch coin data");
				if (errorCb) {
					errorCb();
				}
			});
	}*/
}
