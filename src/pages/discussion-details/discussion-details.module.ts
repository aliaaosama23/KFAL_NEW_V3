import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscussionDetailsPage } from './discussion-details';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DiscussionDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscussionDetailsPage),
    TranslateModule.forChild()
  ],
})
export class DiscussionDetailsPageModule {}
