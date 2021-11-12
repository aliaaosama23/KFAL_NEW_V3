import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddTestFormPage } from './add-test-form';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AddTestFormPage,
  ],
  imports: [
    IonicPageModule.forChild(AddTestFormPage),
    TranslateModule.forChild()
  ],
})
export class AddTestFormPageModule {}
