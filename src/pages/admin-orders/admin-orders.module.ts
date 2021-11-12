import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminOrdersPage } from './admin-orders';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    AdminOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminOrdersPage),
    TranslateModule.forChild(),
    ComponentsModule
  ],
})
export class AdminOrdersPageModule {}
