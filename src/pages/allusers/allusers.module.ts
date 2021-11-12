import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllusersPage } from './allusers';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AllusersPage,
  ],
  imports: [
    IonicPageModule.forChild(AllusersPage),
    TranslateModule.forChild()
  ],
})
export class AllusersPageModule {}
