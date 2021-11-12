import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeadlineCreateEditPage } from './deadline-create-edit';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DeadlineCreateEditPage,
  ],
  imports: [
    IonicPageModule.forChild(DeadlineCreateEditPage),
    TranslateModule.forChild()
  ],
})
export class DeadlineCreateEditPageModule {}
