import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { CoinsListPage } from "./coins-list";

@NgModule({
	declarations: [CoinsListPage],
	imports: [IonicPageModule.forChild(CoinsListPage)]
})
export class CoinsListPageModule {}
