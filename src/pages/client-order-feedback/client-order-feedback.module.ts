import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientOrderFeedbackPage } from './client-order-feedback';
import { StarRatingModule } from 'ionic3-star-rating';
import { TranslateModule} from '@ngx-translate/core';

@NgModule({
  declarations: [
    ClientOrderFeedbackPage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(ClientOrderFeedbackPage),
    TranslateModule.forChild()
  ],
})
export class ClientOrderFeedbackPageModule {}
