import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DiscussionsPage } from './discussions';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DiscussionsPage,
  ],
  imports: [
    IonicPageModule.forChild(DiscussionsPage),
    TranslateModule.forChild()
  ],
})
export class DiscussionsPageModule {}
