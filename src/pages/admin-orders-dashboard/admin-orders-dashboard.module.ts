import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminOrdersDashboardPage } from './admin-orders-dashboard';
import { TranslateModule } from '@ngx-translate/core';

import { NgCircleProgressModule } from 'ng-circle-progress';
@NgModule({
  declarations: [
    AdminOrdersDashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminOrdersDashboardPage),
    TranslateModule.forChild(),
    NgCircleProgressModule
  ],
})
export class AdminOrdersDashboardPageModule {}
