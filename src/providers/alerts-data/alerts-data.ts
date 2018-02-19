import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/observable/forkJoin";
import { Observable } from "rxjs/Observable";
import { Storage } from "@ionic/storage";
import * as _ from "lodash";

import { AppUtility } from "../../shared/utils/app-utility/app-utility";
import { AppConfigs } from "../../shared/configs/app-configs/app-configs";

/*
  Generated class for the AlertsDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertsDataProvider {
	constructor(
		public http: Http,
		public storage: Storage,
		public AppConfigs: AppConfigs,
		public AppUtility: AppUtility
	) {
		this.AppUtility.log("AlertsDataProvider Provider");
	}

	getAlertsData() {
		return this.fetchAlertDateFromStorage();
	}

	getLatestCoinsPrice() {
		return this.getAlertsData().then(data => {
			if (data && data.length) {
				var url = this.AppConfigs.getPriceTickerBaseUrl();
				//?fsyms=ETH,DASH&tsyms=BTC,USD
				let myAlerts = [];
				_.forEach(data, item => {
					myAlerts.push({
						fsym: _.toUpper(item.symbol),
						tsym: _.toUpper(item.unit)
					});
				});

				let observablesArr = [];
				_.forEach(myAlerts, coinPairObj => {
					let finalUrl =
						url +
						"?fsyms=" +
						coinPairObj.fsym +
						"&tsyms=" +
						coinPairObj.tsym;
					observablesArr.push(
						this.http.get(finalUrl).map(res => res.json())
					);
				});

				return Observable.forkJoin(observablesArr);
			} else {
				return data;
			}
		});
	}

	deleteAlert(symbol) {
		try {
			if (!symbol) {
				throw "no symbol provided";
			}
			// remove from storage
			return this.fetchAlertDateFromStorage().then(alertList => {
				return new Promise((resolve, reject) => {
					// remove from list
					_.remove(alertList, (item: any) => {
						return item.symbol === symbol;
					});
					// save it
					this.saveAlertDateToStorage(alertList).then(() => {
						resolve(symbol);
					});
				});
			});
		} catch (err) {
			throw err;
		}
	}
	/*
	* Store alert data
	*/
	addAlert(alertData) {
		try {
			if (!alertData) {
				throw "no alert data provided";
			}
			return this.fetchAlertDateFromStorage().then(
				alertDataFromStorage => {
					// push new alert data to exisitng alerts list
					alertDataFromStorage.push(alertData);
					// store
					return this.saveAlertDateToStorage(alertDataFromStorage);
				}
			);
		} catch (err) {
			throw err;
		}
	}

	fetchAlertDateFromStorage(): any {
		return this.storage
			.get(this.AppConfigs.storageDB.alertsList)
			.then(alertsList => {
				if (!alertsList) {
					return this.storage.set(
						this.AppConfigs.storageDB.alertsList,
						[]
					);
				} else {
					return new Promise((resolve, reject) => {
						resolve(alertsList);
					});
				}
			});
	}

	saveAlertDateToStorage(data) {
		return this.clearAlertsData().then(() => {
			return this.storage.set(this.AppConfigs.storageDB.alertsList, data);
		});
	}

	clearAlertsData() {
		return this.storage.remove(this.AppConfigs.storageDB.alertsList);
	}
}
