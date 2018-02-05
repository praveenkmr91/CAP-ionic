import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertsListPage } from './alerts-list';

@NgModule({
  declarations: [
    AlertsListPage,
  ],
  imports: [
    IonicPageModule.forChild(AlertsListPage),
  ],
})
export class AlertsListPageModule {}
