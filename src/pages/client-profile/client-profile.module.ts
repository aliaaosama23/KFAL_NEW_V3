import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientProfilePage } from './client-profile';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ClientProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ClientProfilePage),
    TranslateModule.forChild()
  ],
})
export class ClientProfilePageModule {}
