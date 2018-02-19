import { Component, ViewChild } from "@angular/core";
//import { UpperCasePipe, CurrencyPipe } from "@angular/common";
import {
	IonicPage,
	NavController,
	NavParams,
	Content,
	reorderArray,
	ActionSheetController
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { BackgroundMode } from "@ionic-native/background-mode";
import { LocalNotifications } from "@ionic-native/local-notifications";
import { Vibration } from "@ionic-native/vibration";
import { AlertsDataProvider } from "../../../providers/alerts-data/alerts-data";
import { AlertAddPage } from "../alert-add/alert-add";
import * as _ from "lodash";
import { Observable } from "rxjs/Observable";
import { AppUtility } from "../../../shared/utils/app-utility/app-utility";

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

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public AlertsDataProvider: AlertsDataProvider,
		public storage: Storage,
		public localNotifications: LocalNotifications,
		public vibration: Vibration,
		public backgroundMode: BackgroundMode,
		public actionSheetCtrl: ActionSheetController,
		public AppUtility: AppUtility
	) {
		/*if (this.AppUtility.isCordova()) {
			this.backgroundMode.enable();
			this.backgroundMode.overrideBackButton();
			this.backgroundMode.setDefaults({ silent: false });

			let isactive = this.backgroundMode.isActive();
			this.AppUtility.showToast(isactive ? "yay" : "nah");

			this.localNotifications.hasPermission().then(function(granted) {
				if (!granted) {
					this.localNotifications.registerPermission();
				}
			});
		}*/
	}

	ionViewDidLoad() {
		this.AppUtility.log("ionViewDidLoad AlertsListPage");

		/*if (this.AppUtility.isCordova()) {
			this.backgroundMode.on("activate").subscribe(
				data => {
					this.AppUtility.showToast("success activate");
				},
				error => {
					this.AppUtility.showToast("failure activate");
				},
				() => {
					this.AppUtility.showToast("fainal");
				}
			);

			this.backgroundMode.on("activate", function() {
				this.AppUtility.showToast("acive");
				setInterval(function() {
					this.AppUtility.showToast("notif trigger");
					this.triggerNotification({
						text: " < 0.00078 \n Current: 0.000056"
					});
				}, 5000);
			});

			this.localNotifications.on("trigger", (notification, state) => {
				let notificationData = JSON.parse(notification.data);
				this.AppUtility.showToast("triggered: " + notificationData.key);
			});
		}*/
	}

	ionViewDidEnter() {
		this.AppUtility.showLoadingMask(() => {
			// get alerts list
			this.doProviderCall(() => {
				this.alertsListClone = this.alertsList;
			});
		});
	}

	doProviderCall(
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
				this.AppUtility.showToast("unable to fetch alerts data");
				if (errorCb) {
					errorCb();
				}
			});
	}

	// open page settings
	doOpensettings() {
		this.AppUtility.log("settings");
	}

	// show/hide search bar
	doToggleSearchBar(): void {
		this.showSearchBar = !this.showSearchBar;
		this.content.resize();
	}

	// cancel search
	onSearchCancel(event): void {
		this.alertsList = this.alertsListClone;
	}

	// search bar list filtering
	doFilter(event): void {
		let input = this.searchQuery.toLowerCase();

		// logic to filter alerts
		this.alertsList = _.filter(this.alertsListClone, alert => {
			let symbol = alert.symbol.toLowerCase();
			return symbol.indexOf(input) > -1;
		});
	}

	doAddAlert() {
		this.navCtrl.push(AlertAddPage);
	}

	triggerCondChanged() {
		this.AppUtility.log(this);
	}

	// page pull down refresh - update current price
	doRefresh(refresher?): any {
		return this.AlertsDataProvider.getLatestCoinsPrice().then(
			observalbeData => {
				// if returned data is observable
				if (observalbeData instanceof Observable) {
					return new Promise((resolve, reject) => {
						observalbeData.subscribe(
							data => {
								_.forEach(data, (coinPairObj: any) => {
									let symbol = _.keys(coinPairObj)[0];
									// extract the alert record based on symbol
									let alertRec = _.find(
										this.alertsList,
										i => {
											return (
												_.toLower(i.symbol) ===
												_.toLower(symbol)
											);
										}
									);
									if (alertRec) {
										alertRec.currentValue =
											coinPairObj[symbol][alertRec.unit];
									}
								});
								if (refresher) {
									refresher.complete();
								}
								resolve();
							},

							error => {
								// create common util
								this.AppUtility.showErrorAlert();
								//reject();
							}
						);
					});
				} else {
					if (refresher) {
						refresher.complete();
					}
				}
			}
		);
	}

	itemLongPress() {
		if (this.allowReorder) {
			return;
		}
		this.vibration.vibrate(50);
		this.allowReorder = true;
		return false;
	}

	finishReOrdering(): void {
		this.allowReorder = false;
	}

	deleteAlert(symbol): void {
		this.AlertsDataProvider.deleteAlert(symbol).then(smbl => {
			// refresh list
			this.ionViewDidEnter();
			this.AppUtility.showToast(
				smbl.toUpperCase() + " is deleted from your Alerts"
			);
		});
	}

	editAlert(symbol): void {
		this.AppUtility.log(symbol);
	}

	toggleAlert(symbol): void {
		this.triggerNotification({
			text: symbol + " < 0.00078 \n Current: 0.000056",
			data: { key: symbol },
			at: new Date(new Date().getTime() + 5 * 1000)
		});
	}

	triggerNotification(options?: object): void {
		let defaults = {
			title: "TARGET REACHED!!!",
			sound: "res://platform_default"
		};
		options = _.assign(defaults, options);
		this.localNotifications.schedule(options);
		this.vibration.vibrate(300);
	}

	reorderItems(indexes): void {
		this.alertsList = reorderArray(this.alertsList, indexes);
	}

	presentActionSheet(symbol?: string) {
		if (!this.allowReorder) {
			let actionSheet = this.actionSheetCtrl.create({
				title: "Options",
				buttons: [
					{
						text: "Edit",
						icon: "color-wand",
						cssClass: "color-wand",
						handler: () => {
							this.AppUtility.log("Edit");
							// navigate to edit page
						}
					},
					{
						text: "Toggle Alert",
						icon: "alarm",
						handler: () => {
							this.AppUtility.log("Toggle clicked");
						}
					},
					{
						text: "Delete",
						icon: "trash",
						handler: () => {
							this.AppUtility.log(symbol);
							this.deleteAlert(symbol);
						}
					}
				]
			});

			actionSheet.present();
		}
	}
}
