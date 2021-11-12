import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentDataPage } from './payment-data';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PaymentDataPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentDataPage),
    TranslateModule.forChild()
  ],
})
export class PaymentDataPageModule {}
