import { NgModule } from '@angular/core';
import { RequestComponent } from './request/request';
import {IonicModule} from 'ionic-angular';
import { RequestDetailsComponent } from './request-details/request-details';
import { StarRatingModule } from 'ionic3-star-rating';
import { TranslateModule } from '@ngx-translate/core';
import { NoDataMessageComponent } from './no-data-message/no-data-message';
import { RequestHeaderComponent } from './request-header/request-header';
import { ExpandableHeaderComponent } from './expandable-header/expandable-header';

@NgModule({
	declarations: [RequestComponent,
    RequestDetailsComponent,
    NoDataMessageComponent,
    RequestHeaderComponent,
    RequestDetailsComponent,
    ExpandableHeaderComponent,

    ],
	imports: [IonicModule,StarRatingModule,TranslateModule],
	exports: [RequestComponent,
    RequestDetailsComponent,
    NoDataMessageComponent,
    RequestHeaderComponent,
    RequestDetailsComponent,
    ExpandableHeaderComponent,
   ]
})
export class ComponentsModule {}
