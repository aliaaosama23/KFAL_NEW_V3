import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminHomePage } from './admin-home';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdminHomePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminHomePage),
    TranslateModule.forChild(),
  ],
})
export class AdminHomePageModule {}
