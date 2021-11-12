import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslatorNewOrdersPage } from './translator-new-orders';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TranslatorNewOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(TranslatorNewOrdersPage),
    TranslateModule.forChild()
  ],
})
export class TranslatorNewOrdersPageModule {}
