import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
	IonicPage,
	NavController,
	NavParams,
	LoadingController,
	ToastController
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
		public formBuilder: FormBuilder,
		public toastCtrl: ToastController
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
		if (this.addAlertForm.valid) {
			let alertData = this.addAlertForm.value;
			// store data
			this.AlertsDataProvider.addAlert(alertData)
				.then(alertData => {
					this.navCtrl.pop();
					this.showToast("Alert Added Successfully");
				})
				.catch(exception => {
					console.error(exception);
					this.showToast("oh noes!");
				});
		} else {
			console.log("form not valid. Please ente all Mandatory fields");
			this.showToast(
				"form is not valid. Please enter all Mandatory fields"
			);
		}
	}

	showToast(msg: string, duration?: number) {
		duration = duration || 3000;
		let toast = this.toastCtrl.create({
			message: msg,
			duration: duration
		});
		toast.present();
	}
}
