import { Injectable } from "@angular/core";
import {
	ToastController,
	Platform,
	AlertController,
	LoadingController
} from "ionic-angular";
import { AppConfigs } from "../../configs/app-configs/app-configs";
import * as _ from "lodash";

/*
  Generated class for the AppUtilityProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppUtility {
	constructor(
		public AppConfigs: AppConfigs,
		public toastCtrl: ToastController,
		public platform: Platform,
		public alertCtrl: AlertController,
		public loading: LoadingController
	) {}

	public log(msg: any, showToast?: boolean): any {
		if (showToast) {
			msg = JSON.stringify(msg);
			this.showToast(msg);
		}
		console.log(msg);
	}

	public showToast(msg: string, duration?: number): void {
		duration = duration || 3000;
		let toast = this.toastCtrl.create({
			message: msg,
			duration: duration
		});
		toast.present();
	}

	public showErrorAlert(): void {
		this.showAlert({
			title: "Error",
			subTitle:
				"something went wrong. Please check your internet connection"
		});
	}

	public showAlert(opts): void {
		opts = _.assign(
			{
				title: "",
				subTitle: "",
				buttons: ["OK"]
			},
			opts
		);
		this.alertCtrl.create(opts).present();
	}

	public showLoadingMask(successCB?): void {
		let loader = this.loading.create({
			content: "Please wait..."
		});

		// present loader
		loader.present().then(() => {
			if (successCB) {
				successCB();
			}
			loader.dismiss();
		});
	}

	public isCordova(): boolean {
		return this.platform.is("cordova");
	}
}
