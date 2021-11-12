import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpgradeRequestDetailsPage } from './upgrade-request-details';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UpgradeRequestDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(UpgradeRequestDetailsPage),
    TranslateModule.forChild()
  ],
})
export class UpgradeRequestDetailsPageModule {}
