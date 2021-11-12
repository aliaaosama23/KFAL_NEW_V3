import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { MainpagePage } from './mainpage';

@NgModule({
  declarations: [
    MainpagePage,
  ],
  imports: [
    IonicPageModule.forChild(MainpagePage),
    TranslateModule.forChild()
  ],
})
export class MainpagePageModule {}
