import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientProfileUpgradePage } from './client-profile-upgrade';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ClientProfileUpgradePage,
  ],
  imports: [
    IonicPageModule.forChild(ClientProfileUpgradePage),
    TranslateModule.forChild()
  ],
})
export class ClientProfileUpgradePageModule {}
