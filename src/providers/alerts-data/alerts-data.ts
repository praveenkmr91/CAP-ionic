import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Storage } from "@ionic/storage";

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
}
