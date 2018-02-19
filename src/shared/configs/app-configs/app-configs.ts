import { Injectable } from "@angular/core";

/*
  Generated class for the AppConfigs provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppConfigs {
	storageDB = {
		alertsList: "alertsList"
	};

	constructor() {
		console.log("Hello AppConfigsProvider Provider");
	}

	public getPriceTickerBaseUrl(): string {
		return "https://min-api.cryptocompare.com/data/pricemulti";
		//?fsyms=ETH,DASH&tsyms=BTC,USD
	}

	public getCoinsBaseUrl(): string {
		//return "https://coincap.io/front";
		return "assets/data/coins-by-cap.json";
	}
}
