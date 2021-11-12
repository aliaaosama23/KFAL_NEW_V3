import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminDirectRegCompleteDataPage } from './admin-direct-reg-complete-data';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdminDirectRegCompleteDataPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminDirectRegCompleteDataPage),
    TranslateModule.forChild()
  ],
})
export class AdminDirectRegCompleteDataPageModule {}
