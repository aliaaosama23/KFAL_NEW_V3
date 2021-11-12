import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslatorHomePage } from './translator-home';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TranslatorHomePage,
  ],
  imports: [
    IonicPageModule.forChild(TranslatorHomePage),
    TranslateModule.forChild()
  ],
})
export class TranslatorHomePageModule {}
