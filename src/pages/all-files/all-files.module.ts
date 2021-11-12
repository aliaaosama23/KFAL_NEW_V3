import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllFilesPage } from './all-files';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AllFilesPage,
  ],
  imports: [
    IonicPageModule.forChild(AllFilesPage),
    TranslateModule.forChild()
  ],
})
export class AllFilesPageModule {}
