import { Component } from "@angular/core";
import { IonicPage, Platform } from "ionic-angular";
import { FingerprintAIO } from "@ionic-native/fingerprint-aio";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-settings",
	templateUrl: "settings.html"
})
export class SettingsPage {
	lockApp: boolean = false;
	constructor(public fingerAuth: FingerprintAIO, public platform: Platform) {}

	ionViewDidLoad() {
		console.log("ionViewDidLoad SettingsPage");
	}

	async lockAppSettingChanged() {
		await this.platform.ready();
		const c = await this.fingerAuth.isAvailable();
		alert(c);

		/*let c = this.fingerAuth
			.isAvailable()
			.then((result: any) => {
				alert(result);
			})
			.catch((error: any) => {
				alert("oops");
				console.log(error);
			});*/

		/*this.fingerAuth
			.isAvailable()
			.then((result: any) => {
				alert(result);
				this.fingerAuth
					.show({
						clientId: "Fingerprint-Demo"
						//clientSecret: "password", //Only necessary for Android
						//disableBackup: false, //Only for Android(optional)
						//localizedFallbackTitle: "Use Pin", //Only for iOS
						//localizedReason: "Please authenticate" //Only for iOS
					})
					.then((result: any) => console.log(result))
					.catch((error: any) => console.log(error));
			})
			.catch((error: any) => {
				console.log(error);
				alert("oops");
			});*/
	}
}
