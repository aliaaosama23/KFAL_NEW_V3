import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeadlinesPanelPage } from './deadlines-panel';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    DeadlinesPanelPage,
  ],
  imports: [
    IonicPageModule.forChild(DeadlinesPanelPage),
    TranslateModule.forChild()
  ],
})
export class DeadlinesPanelPageModule {}
