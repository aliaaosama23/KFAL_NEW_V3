import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RulesPage } from './rules';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    RulesPage,
  ],
  imports: [
    IonicPageModule.forChild(RulesPage),
    TranslateModule.forChild()
  ],
})
export class RulesPageModule {}
