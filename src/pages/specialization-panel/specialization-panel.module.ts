import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecializationPanelPage } from './specialization-panel';

@NgModule({
  declarations: [
    SpecializationPanelPage,
  ],
  imports: [
    IonicPageModule.forChild(SpecializationPanelPage),
    TranslateModule.forChild()

  ],
})
export class SpecializationPanelPageModule {}
