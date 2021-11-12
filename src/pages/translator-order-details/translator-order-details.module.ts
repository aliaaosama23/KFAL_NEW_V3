import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslatorOrderDetailsPage } from './translator-order-details';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TranslatorOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(TranslatorOrderDetailsPage),
    TranslateModule.forChild()
  ],
})
export class TranslatorOrderDetailsPageModule {}
