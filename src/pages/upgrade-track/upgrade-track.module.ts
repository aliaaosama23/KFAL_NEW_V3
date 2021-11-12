import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpgradeTrackPage } from './upgrade-track';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UpgradeTrackPage,
  ],
  imports: [
    IonicPageModule.forChild(UpgradeTrackPage),
    TranslateModule.forChild()
  ],
})
export class UpgradeTrackPageModule {}
