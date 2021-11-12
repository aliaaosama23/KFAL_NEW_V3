import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientProfileEditPage } from './client-profile-edit';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    ClientProfileEditPage,
  ],
  imports: [
    IonicPageModule.forChild( ClientProfileEditPage),
    TranslateModule.forChild()
  ],
})
export class ClientProfileEditPageModule {}
