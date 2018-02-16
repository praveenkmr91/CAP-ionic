import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Storage } from "@ionic/storage";
import * as _ from "lodash";

/*
  Generated class for the AlertsDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AlertsDataProvider {
	constructor(public http: Http, public storage: Storage) {
		console.log("Hello AlertsDataProvider Provider");
	}

	getAlertsData() {
		return this.fetchAlertDateFromStorage();
	}

	getLatestCoinsPrice() {
		//var url = "";
		var dev_url = "assets/data/alerts.json";
		return this.http.get(dev_url).map(res => res.json());
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
					_.remove(alertList, function(item) {
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
		return this.storage.get("alertsList").then(alertsList => {
			if (!alertsList) {
				return this.storage.set("alertsList", []);
			} else {
				return new Promise((resolve, reject) => {
					resolve(alertsList);
				});
			}
		});
	}

	saveAlertDateToStorage(data) {
		return this.clearAlertsData().then(() => {
			return this.storage.set("alertsList", data);
		});
	}

	clearAlertsData() {
		return this.storage.remove("alertsList");
	}
}
