import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientProfileCompletePage } from './client-profile-complete';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ClientProfileCompletePage,
  ],
  imports: [
    IonicPageModule.forChild(ClientProfileCompletePage),
    TranslateModule.forChild()
  ],
})
export class ClientProfileCompletePageModule {}
