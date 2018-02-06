import { Component, ViewChild } from "@angular/core";
import {
	IonicPage,
	NavController,
	NavParams,
	Content,
	LoadingController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import * as _ from "lodash";

/**
 * Generated class for the PortfolioListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-portfolio-list",
	templateUrl: "portfolio-list.html"
})
export class PortfolioListPage {
	showSearchBar: boolean = false;
	searchQuery: string = "";

	@ViewChild("content") content: Content;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loading: LoadingController,
		public storage: Storage
	) {}

	ionViewDidLoad() {
		//console.log("ionViewDidLoad PortfolioListPage");

		let loader = this.loading.create({
			content: "Please wait..."
		});

		// present loader
		loader.present().then(() => {
			// get alerts data from storage
			loader.dismiss();
		});
	}

	// show/hide search bar
	doToggleSearchBar(): void {
		this.showSearchBar = !this.showSearchBar;
		this.content.resize();
	}

	// open settings
	doOpensettings() {
		console.log("settings");
	}

	// cancel search
	onSearchCancel(event): void {
		//this.alerts = this.alertsClone;
	}

	// search bar list filtering
	doFilter(event): void {
		var input = this.searchQuery.toLowerCase();
		// logic to filter alerts
	}
}
