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
		var dev_url = "assets/data/alerts.json";
		return this.http.get(dev_url).map(res => res.json());
	}

	getLatestCoinsPrice() {
		var url = "";
		var dev_url = "assets/data/alerts.json";
		return this.http.get(dev_url).map(res => res.json());
	}

	deleteAlert(symbol, list) {
		try {
			if (!symbol) {
				throw "no symbol provided";
			}
			if (!_.isArray(list)) {
				throw "expected an array";
			}
			if (_.isArray(list)) {
				if (!list.length) {
					throw "received empty list. Nothing to delete";
				} else {
					return _.remove(list, function(item) {
						return item.symbol === symbol;
					});
				}
			}
		} catch (err) {
			throw err;
		}
	}
}
