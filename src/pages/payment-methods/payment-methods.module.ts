import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentMethodsPage } from './payment-methods';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    PaymentMethodsPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentMethodsPage),
    TranslateModule.forChild()
  ],
})
export class PaymentMethodsPageModule {}
