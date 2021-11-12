import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminOrderDetailsPage } from './admin-order-details';
import { TranslateModule } from '@ngx-translate/core';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    AdminOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild( AdminOrderDetailsPage),
    TranslateModule.forChild(),
    StarRatingModule,
    ComponentsModule
  ],
})
export class AdminOrderDetailsPageModule {}
