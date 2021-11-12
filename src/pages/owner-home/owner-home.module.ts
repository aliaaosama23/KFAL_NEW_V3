import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { OwnerHomePage } from './owner-home';

@NgModule({
  declarations: [
    OwnerHomePage,
  ],
  imports: [
    IonicPageModule.forChild(OwnerHomePage),
    TranslateModule.forChild(),

  ],
})
export class OwnerHomePageModule {}
