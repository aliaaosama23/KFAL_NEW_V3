import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientProfileDiscussionPage } from './client-profile-discussion';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ClientProfileDiscussionPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientProfileDiscussionPage),
    TranslateModule.forChild()
  ],
})
export class ClientProfileDiscussionPageModule {}
