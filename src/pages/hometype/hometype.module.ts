import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HometypePage } from './hometype';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    HometypePage,
  ],
  imports: [
    IonicPageModule.forChild(HometypePage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class HometypePageModule {}
