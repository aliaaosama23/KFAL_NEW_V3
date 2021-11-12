import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { EducationLevelsPanelPage } from './education-levels-panel';

@NgModule({
  declarations: [
    EducationLevelsPanelPage,
  ],
  imports: [
    IonicPageModule.forChild(EducationLevelsPanelPage),
    TranslateModule.forChild()
  ],
})
export class EducationLevelsPanelPageModule {}
