import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminAddUserPage } from './admin-add-user';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdminAddUserPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminAddUserPage),
    TranslateModule.forChild()
  ],
})
export class AdminAddUserPageModule {}
