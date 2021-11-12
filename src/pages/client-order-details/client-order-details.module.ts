import { ComponentsModule } from './../../components/components.module';
import { RequestHeaderComponent } from './../../components/request-header/request-header';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ClientOrderDetailsPage } from './client-order-details';
import { TranslateModule } from '@ngx-translate/core';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    ClientOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ClientOrderDetailsPage),
    TranslateModule.forChild(),
    StarRatingModule,
  ComponentsModule
  ],
})
export class ClientOrderDetailsPageModule {}
