import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { AppConfigs } from "../../shared/configs/app-configs/app-configs";

/*
  Generated class for the CoinsDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CoinsDataProvider {
	data: any;

	constructor(public http: Http, public AppConfigs: AppConfigs) {
		console.log("Hello CoinsDataProvider Provider");
	}

	getCoins() {
		return this.http
			.get(this.AppConfigs.getCoinsBaseUrl())
			.map(res => res.json());
	}
}
