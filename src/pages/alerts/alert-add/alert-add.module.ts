import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlertAddPage } from './alert-add';

@NgModule({
  declarations: [
    AlertAddPage,
  ],
  imports: [
    IonicPageModule.forChild(AlertAddPage),
  ],
})
export class AlertAddPageModule {}
