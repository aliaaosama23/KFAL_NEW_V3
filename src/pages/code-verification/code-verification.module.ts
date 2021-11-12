import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodeVerificationPage } from './code-verification';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    CodeVerificationPage,
  ],
  imports: [
    IonicPageModule.forChild(CodeVerificationPage),
    TranslateModule.forChild()
  ],
})
export class CodeVerificationPageModule {}
