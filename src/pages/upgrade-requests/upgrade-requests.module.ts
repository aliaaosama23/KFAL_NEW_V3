import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpgradeRequestsPage } from './upgrade-requests';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UpgradeRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(UpgradeRequestsPage),
    TranslateModule.forChild()
  ],
})
export class UpgradeRequestsPageModule {}
