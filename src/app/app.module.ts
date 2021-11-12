import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SocialSharing } from '@ionic-native/social-sharing';
import { IonicStorageModule } from '@ionic/storage';
import { Device } from '@ionic-native/device';
import { HttpClientModule} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpModule, Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HelperProvider } from '../providers/helper/helper';
import { StarRatingModule } from 'ionic3-star-rating';
import { SettingsProvider } from '../providers/settings/settings';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio';
import { ClientProvider } from '../providers/client/client';
import { ProvidersProvider } from '../providers/providers/providers';
import { AdminProvider } from '../providers/admin/admin';
import { GeneralProvider } from '../providers/general/general';
import { TestformsProvider } from '../providers/testforms/testforms';
import { ControlpanelProvider } from '../providers/controlpanel/controlpanel';
import { UpgradeRequestsProvider } from '../providers/upgrade-requests/upgrade-requests';
import { ExpandableHeaderComponent } from '../components/expandable-header/expandable-header';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CustomConfigrations } from '../CustomConfigrations';
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MyApp,

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    StarRatingModule ,
    IonicModule.forRoot(MyApp),
      // Specify ng-circle-progress as an import
      NgCircleProgressModule.forRoot({
        // set defaults here
        innerStrokeColor:"#FFAA45",
        showInnerStroke:false,
        responsive:true,
        showSubtitle:false,
        titleColor:"#FFAA45",// #b9b4b4
        titleFontSize:"60",
        showUnits:true,
        radius: 100,
        unitsFontSize:'25',
        outerStrokeWidth: 16,
        outerStrokeColor: "#FFAA45",
        animationDuration: 300,
        innerStrokeWidth:4,
        
      }),
    TranslateModule.forRoot(),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidPermissions,
    File,Push,
    FileTransfer,
    InAppBrowser,
    SocialSharing,
    Device,
    FingerprintAIO,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HelperProvider,
    SettingsProvider,
    ClientProvider,
    ProvidersProvider,
    AdminProvider,
    GeneralProvider,
    TestformsProvider,
    ControlpanelProvider,
    UpgradeRequestsProvider,
    CustomConfigrations
  ]
})
export class AppModule {}
