import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
	IonicPage,
	NavController,
	NavParams,
	LoadingController
} from "ionic-angular";

import * as _ from "lodash";
import { Storage } from "@ionic/storage";
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
	addAlertForm: FormGroup;
	baseUnits: any = ["USDT", "BTC", "ETH", "NEO", "BCH"];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public loading: LoadingController,
		public storage: Storage,
		public AlertsDataProvider: AlertsDataProvider,
		public formBuilder: FormBuilder
	) {
		this.addAlertForm = this.formBuilder.group({
			symbol: ["", Validators.required],
			targetVal: ["", Validators.required],
			unit: ["BTC", Validators.required],
			triggerCondition: ["", Validators.required]
		});
	}

	ionViewDidLoad() {
		//console.log("ionViewDidLoad AlertAddPage");
	}

	addAlertSubmit(evt) {
		console.log(evt);

		let alertData = {};

		if (this.addAlertForm.valid) {
			console.log(this.addAlertForm.value);
			// store data
		} else {
			console.log("not valid");
		}
	}
}
