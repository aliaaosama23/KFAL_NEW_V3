import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { EducationLevelCreateEditPage } from './education-level-create-edit';

@NgModule({
  declarations: [
    EducationLevelCreateEditPage,
  ],
  imports: [
    IonicPageModule.forChild(EducationLevelCreateEditPage),
    TranslateModule.forChild()

  ],
})
export class EducationLevelCreateEditPageModule {}
