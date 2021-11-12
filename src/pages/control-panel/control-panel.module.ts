import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ControlPanelPage } from './control-panel';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    ControlPanelPage,
  ],
  imports: [
    IonicPageModule.forChild(ControlPanelPage),
    TranslateModule.forChild()
  ],
})
export class ControlPanelPageModule {}
