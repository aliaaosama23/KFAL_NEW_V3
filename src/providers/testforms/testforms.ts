import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { HelperProvider } from '../helper/helper';
import { GeneralProvider } from '../general/general';
import { ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class TestformsProvider {

  constructor(public http: HttpClient,public helper:HelperProvider,public general:GeneralProvider,
              private toastCtrl:ToastController,private translate:TranslateService) {
                           console.log('Hello TestformsProvider Provider');
  }


}
