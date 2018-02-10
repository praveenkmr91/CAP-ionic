import { Component } from "@angular/core";
import {
	IonicPage,
	NavController,
	NavParams,
	ViewController
} from "ionic-angular";

/**
 * Generated class for the AlertOptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: "page-alert-options",
	templateUrl: "alert-options.html"
})
export class AlertOptionsPage {
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController
	) {}

	close(selectedOption) {
		this.viewCtrl.dismiss(selectedOption);
	}
}
