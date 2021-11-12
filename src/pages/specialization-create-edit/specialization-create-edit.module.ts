import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { SpecializationCreateEditPage } from './specialization-create-edit';

@NgModule({
  declarations: [
    SpecializationCreateEditPage,
  ],
  imports: [
    IonicPageModule.forChild(SpecializationCreateEditPage),
    TranslateModule.forChild()

  ],
})
export class SpecializationCreateEditPageModule {}
