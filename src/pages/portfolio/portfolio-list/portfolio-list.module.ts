import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PortfolioListPage } from './portfolio-list';

@NgModule({
  declarations: [
    PortfolioListPage,
  ],
  imports: [
    IonicPageModule.forChild(PortfolioListPage),
  ],
})
export class PortfolioListPageModule {}
