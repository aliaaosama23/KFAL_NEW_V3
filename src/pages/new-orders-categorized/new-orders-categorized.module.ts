import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewOrdersCategorizedPage } from './new-orders-categorized';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NewOrdersCategorizedPage,
  ],
  imports: [
    IonicPageModule.forChild(NewOrdersCategorizedPage),
    TranslateModule.forChild()
  ],
})
export class NewOrdersCategorizedPageModule {}
