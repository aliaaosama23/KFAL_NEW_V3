import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SendTestformPage } from './send-testform';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    SendTestformPage,
  ],
  imports: [
    IonicPageModule.forChild(SendTestformPage),
    TranslateModule.forChild()
  ],
})
export class SendTestformPageModule {}
