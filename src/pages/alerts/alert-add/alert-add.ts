import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AlertsDataProvider } from "../../../providers/alerts-data/alerts-data";

/**
 * Generated class for the AlertAddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-alert-add",
	templateUrl: "alert-add.html"
})
export class AlertAddPage {
	baseUnits: any = ["USD", "BTC", "ETH"];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public AlertsDataProvider: AlertsDataProvider
	) {}

	ionViewDidLoad() {
		//console.log("ionViewDidLoad AlertAddPage");
	}

	doAdd() {
		console.log("add logic");
	}
}
