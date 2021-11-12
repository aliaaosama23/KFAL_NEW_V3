import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminAddDiscussionPage } from './admin-add-discussion';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdminAddDiscussionPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminAddDiscussionPage),
    TranslateModule.forChild()
  ],
})
export class AdminAddDiscussionPageModule {}
