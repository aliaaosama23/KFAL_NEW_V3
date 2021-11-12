import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LanguagesPanelPage } from './languages-panel';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    LanguagesPanelPage,
  ],
  imports: [
    IonicPageModule.forChild(LanguagesPanelPage),
    TranslateModule.forChild()
  ],
})
export class LanguagesPanelPageModule {}
