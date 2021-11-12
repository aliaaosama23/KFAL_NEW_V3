import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LanguageCreateEditPage } from './language-create-edit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LanguageCreateEditPage,
  ],
  imports: [
    IonicPageModule.forChild(LanguageCreateEditPage),
    TranslateModule.forChild()
  ],
})
export class LanguageCreateEditPageModule {}
