import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientOrderEditPage } from './client-order-edit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ClientOrderEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientOrderEditPage),
    TranslateModule.forChild()
  ],
})
export class ClientOrderEditPageModule {}
