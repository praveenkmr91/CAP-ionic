import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";

/*
  Generated class for the CoinsDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CoinsDataProvider {
	data: any;

	constructor(public http: Http) {
		console.log("Hello CoinsDataProvider Provider");
	}

	getCoins() {
		//var limit = 20;

		//var url = "https://coincap.io/front";
		var dev_url = "assets/data/coins-by-cap.json";
		return this.http.get(dev_url).map(res => res.json());
	}
}
