import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TranslatedTestForReviewerPage } from './translated-test-for-reviewer';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    TranslatedTestForReviewerPage,
  ],
  imports: [
    IonicPageModule.forChild(TranslatedTestForReviewerPage),
    TranslateModule.forChild()
  ],
})
export class TranslatedTestForReviewerPageModule {}
