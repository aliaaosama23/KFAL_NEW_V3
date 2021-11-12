import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddNotificationPage } from './add-notification';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddNotificationPage,
  ],
  imports: [
    IonicPageModule.forChild(AddNotificationPage),
    TranslateModule.forChild()
  ],
})
export class AddNotificationPageModule {}
