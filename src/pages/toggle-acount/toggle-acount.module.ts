import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ToggleAcountPage } from './toggle-acount';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    ToggleAcountPage,
  ],
  imports: [
    IonicPageModule.forChild(ToggleAcountPage),
    TranslateModule.forChild()
  ],
})
export class ToggleAcountPageModule {}
