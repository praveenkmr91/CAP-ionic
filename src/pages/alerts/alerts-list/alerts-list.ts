import { Component, ViewChild } from "@angular/core";
import {
	IonicPage,
	NavController,
	NavParams,
	Content,
	LoadingController,
	AlertController,
	PopoverController
} from "ionic-angular";
import { Storage } from "@ionic/storage";

import { AlertsDataProvider } from "../../../providers/alerts-data/alerts-data";
import { AlertAddPage } from "../alert-add/alert-add";
import { AlertOptionsPage } from "./alert-options/alert-options";

/**
 * Generated class for the AlertsListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-alerts-list",
	templateUrl: "alerts-list.html"
})
export class AlertsListPage {
	showSearchBar: boolean = false;
	triggerCond: boolean = false;
	alertsList: any = [];
	alertsListClone: any = [];
	searchQuery: string = "";
	allowReorder: boolean = false;
	selectedAlertOption: string = "";

	@ViewChild("content") content: Content;
	//@ViewChild("triggerCond") content: Content;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loading: LoadingController,
		public AlertsDataProvider: AlertsDataProvider,
		public storage: Storage,
		public alertCtrl: AlertController,
		public popoverCtrl: PopoverController
	) {}

	ionViewDidLoad() {
		console.log("ionViewDidLoad AlertsListPage");
		// define loader configs
		let loader = this.loading.create({
			content: "Please wait..."
		});

		// present loader
		loader.present().then(() => {
			// get alerts list
			this.doProviderCall(() => {
				this.alertsListClone = this.alertsList;
				// dismiss loader
				loader.dismiss();
			});
		});
	}

	doProviderCall(
		successCb?: Function,
		errorCb?: Function,
		finalCb?: Function
	) {
		this.AlertsDataProvider.getAlertsData().subscribe(
			data => {
				this.alertsList = data;
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
		this.alertsList = this.alertsListClone;
	}

	// search bar list filtering
	doFilter(event): void {
		var input = this.searchQuery.toLowerCase();
		// logic to filter alerts
	}

	doAddAlert() {
		this.navCtrl.push(AlertAddPage);
	}

	triggerCondChanged() {
		console.log(this);
	}

	// page pull down refresh - update current price
	doRefreshAlerts(refresher): void {
		this.AlertsDataProvider.getLatestCoinsPrice().subscribe(
			data => {
				refresher.complete();
			},
			error => {
				// create common util
				let alert = this.alertCtrl.create({
					title: "Error",
					subTitle:
						"something went wrong. Please check your internet connection",
					buttons: ["OK"]
				});
				alert.present();
			}
		);
	}

	itemLongPress(): void {
		this.allowReorder = true;
	}

	finishReOrdering(): void {
		this.allowReorder = false;
	}

	presentPopover(myEvent, symbol) {
		let popover = this.popoverCtrl.create(AlertOptionsPage);
		popover.present({
			ev: myEvent
		});
		popover.onDidDismiss(data => {
			if (data != null) {
				this.selectedAlertOption = data;
				switch (data) {
					case "edit":
						this.editAlert(symbol);
						break;
					case "delete":
						this.deleteAlert(symbol);
						break;
					case "toggle":
						this.toggleAlert(symbol);
						break;
				}
			}
		});
	}

	deleteAlert(symbol) {
		var newList = this.AlertsDataProvider.deleteAlert(
			symbol,
			this.alertsList
		);
		console.log(newList);
	}
}
