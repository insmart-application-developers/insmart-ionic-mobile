import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder} from '@ionic-native/native-geocoder';
import { Network } from '@ionic-native/network';
import { IonicStorageModule } from '@ionic/storage';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Push } from '@ionic-native/push';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { CallNumber } from '@ionic-native/call-number';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { NgCalendarModule  } from 'ionic2-calendar';

import { LoginPage } from '../pages/login/login';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NotificationPage } from '../pages/menu-notification/notification';
import { MenuInfoPage } from '../pages/menu-info/menu-info';
import { MenuUserinformationPage  } from '../pages/menu-userinformation/menu-userinformation';
import { MenuUserinformationModalPage } from '../pages/menu-userinformation-modal/menu-userinformation-modal';
import { MenuScanqrcodePage } from '../pages/menu-scanqrcode/menu-scanqrcode';
import { MenuHealthtipsPage } from '../pages/menu-healthtips/menu-healthtips';
import { HealthcarePage } from '../pages/home-healthcare/healthcare';
import { MenuChatPage } from '../pages/menu-chat/menu-chat';
import { FindingmedicalprovidersPage } from '../pages/home-healthcare-findingmedicalproviders/findingmedicalproviders';
import { HomeHealthcareHealthmedical2opinionPage } from '../pages/home-healthcare-healthmedical2opinion/home-healthcare-healthmedical2opinion';
import { HomeHealthcareHealthscreeningPage } from '../pages/home-healthcare-healthscreening/home-healthcare-healthscreening';
import { HomeHealthcareHealthscreeningHealthchartPage } from '../pages/home-healthcare-healthscreening-healthchart/home-healthcare-healthscreening-healthchart';
import { HomeHealthcareMedicalassistancePage } from '../pages/home-healthcare-medicalassistance/home-healthcare-medicalassistance';
import { HomeHealthcareMedicalhistoryPage } from '../pages/home-healthcare-medicalhistory/home-healthcare-medicalhistory';
import { HomeHealthcareMedicalconciergePage } from '../pages/home-healthcare-medicalconcierge/home-healthcare-medicalconcierge';
import { HomeHealthcareMedicalconciergeAboutPage } from '../pages/home-healthcare-medicalconcierge-about/home-healthcare-medicalconcierge-about';
import { HomeHealthcareMedicalconciergeAppointmentsPage } from '../pages/home-healthcare-medicalconcierge-appointments/home-healthcare-medicalconcierge-appointments';
import { HomeHealthcareMedicalconciergeBooknewPage } from '../pages/home-healthcare-medicalconcierge-booknew/home-healthcare-medicalconcierge-booknew';
import { InsurancePage } from '../pages/home-insurance/insurance';
import { HomeInsuranceBenefitPage } from '../pages/home-insurance-benefit/home-insurance-benefit';
import { HomeInsuranceClaimPage } from '../pages/home-insurance-claim/home-insurance-claim';
import { HomeInsuranceDirectbillingPage } from '../pages/home-insurance-directbilling/home-insurance-directbilling';
import { HomeInsuranceDirectbillingDetailPage } from '../pages/home-insurance-directbilling-detail/home-insurance-directbilling-detail';
import { HomeInsuranceSubmitclaimPage } from '../pages/home-insurance-submitclaim/home-insurance-submitclaim';
import { HomeInsuranceSubmitclaimGuidePage } from '../pages/home-insurance-submitclaim-guide/home-insurance-submitclaim-guide';
import { HomeInsuranceSubmitclaimGuidedentistrydocumentmedicalPage } from '../pages/home-insurance-submitclaim-guidedentistrydocumentmedical/home-insurance-submitclaim-guidedentistrydocumentmedical';
import { HomeInsuranceSubmitclaimDocumentMedicalPage } from '../pages/home-insurance-submitclaim-documentmedical/home-insurance-submitclaim-documentmedical';
import { HomeInsuranceSubmitclaimDocumentfinancialPage } from '../pages/home-insurance-submitclaim-documentfinancial/home-insurance-submitclaim-documentfinancial';
import { HomeInsuranceSubmitclaimDocumentdifferencePage } from '../pages/home-insurance-submitclaim-documentdifference/home-insurance-submitclaim-documentdifference';
import { HomeInsuranceSubmitclaimDocumentspreviewPage } from '../pages/home-insurance-submitclaim-documentspreview/home-insurance-submitclaim-documentspreview';
import { HomeInsuranceSubmitclaimDocumentCapturePage } from '../pages/home-insurance-submitclaim-document-capture/home-insurance-submitclaim-document-capture';
import { HomeInsuranceSubmitclaimDocumentCaptureFullscreenPage } from '../pages/home-insurance-submitclaim-document-capture-fullscreen/home-insurance-submitclaim-document-capture-fullscreen';
import { HomeInsuranceSubmitclaimThankyouPage } from '../pages/home-insurance-submitclaim-thankyou/home-insurance-submitclaim-thankyou';
import { HomeInsuranceTodolistPage } from '../pages/home-insurance-todolist/home-insurance-todolist';

import { LocalJsonServiceProvider } from '../providers/localjson-service/localjson-service';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { AuthService } from '../providers/auth-service/auth-service';
import { StorageServiceProvider } from '../providers/storage-service/storage-service';
import { MemberServiceProvider } from '../providers/member-service/member-service';
import { MedproviderServiceProvider } from '../providers/medprovider-service/medprovider-service';
import { ClaimServiceProvider } from '../providers/claim-service/claim-service';
import { Calendar } from '../providers/calendar-service/calendar';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ModalScaleUpEnterTransition } from '../animations/scale-up-enter.transition';
import { ModalScaleUpLeaveTransition } from '../animations/scale-down-leave.transition';

const config : SocketIoConfig = { url:'http://localhost:3001', options:{}};

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    LoginPage,
    MyApp,
    HomePage,
    NotificationPage,
    MenuInfoPage,
    MenuUserinformationPage,
    MenuUserinformationModalPage,
    MenuScanqrcodePage,
    MenuHealthtipsPage,
    MenuChatPage,
    HealthcarePage,
    FindingmedicalprovidersPage,
    HomeHealthcareHealthmedical2opinionPage,
    HomeHealthcareMedicalhistoryPage,
    HomeHealthcareHealthscreeningPage,
    HomeHealthcareHealthscreeningHealthchartPage,
    HomeHealthcareMedicalassistancePage,
    HomeHealthcareMedicalconciergePage,
    HomeHealthcareMedicalconciergeAboutPage,
    HomeHealthcareMedicalconciergeAppointmentsPage,
    HomeHealthcareMedicalconciergeBooknewPage,
    InsurancePage,
    HomeInsuranceBenefitPage,
    HomeInsuranceClaimPage,
    HomeInsuranceDirectbillingPage,
    HomeInsuranceDirectbillingDetailPage,
    HomeInsuranceSubmitclaimPage,
    HomeInsuranceSubmitclaimGuidePage,
    HomeInsuranceSubmitclaimGuidedentistrydocumentmedicalPage,
    HomeInsuranceSubmitclaimDocumentMedicalPage,
    HomeInsuranceSubmitclaimDocumentfinancialPage,
    HomeInsuranceSubmitclaimDocumentdifferencePage,
    HomeInsuranceSubmitclaimDocumentspreviewPage,
    HomeInsuranceSubmitclaimDocumentCapturePage,
    HomeInsuranceSubmitclaimThankyouPage,
    HomeInsuranceSubmitclaimDocumentCaptureFullscreenPage,
    HomeInsuranceTodolistPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      scrollPadding: false,
      scrollAssist: false,
      pageTransition:'ios-transition'
    }),
    HttpModule,
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot(),
    NgxQRCodeModule,
    HttpClientModule,
    NgCalendarModule,
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
    LoginPage,
    MyApp,
    HomePage,
    NotificationPage,
    MenuInfoPage,
    MenuUserinformationPage,
    MenuUserinformationModalPage,
    MenuScanqrcodePage,
    MenuHealthtipsPage,
    MenuChatPage,
    HealthcarePage,
    FindingmedicalprovidersPage,
    HomeHealthcareHealthmedical2opinionPage,
    HomeHealthcareMedicalhistoryPage,
    HomeHealthcareHealthscreeningPage,
    HomeHealthcareHealthscreeningHealthchartPage,
    HomeHealthcareMedicalassistancePage,
    HomeHealthcareMedicalconciergePage,
    HomeHealthcareMedicalconciergeAboutPage,
    HomeHealthcareMedicalconciergeAppointmentsPage,
    HomeHealthcareMedicalconciergeBooknewPage,
    InsurancePage,
    HomeInsuranceBenefitPage,
    HomeInsuranceClaimPage,
    HomeInsuranceDirectbillingPage,
    HomeInsuranceDirectbillingDetailPage,
    HomeInsuranceSubmitclaimPage,
    HomeInsuranceSubmitclaimGuidePage,
    HomeInsuranceSubmitclaimGuidedentistrydocumentmedicalPage,
    HomeInsuranceSubmitclaimDocumentMedicalPage,
    HomeInsuranceSubmitclaimDocumentfinancialPage,
    HomeInsuranceSubmitclaimDocumentdifferencePage,
    HomeInsuranceSubmitclaimDocumentspreviewPage,
    HomeInsuranceSubmitclaimDocumentCapturePage,
    HomeInsuranceSubmitclaimThankyouPage,
    HomeInsuranceSubmitclaimDocumentCaptureFullscreenPage,
    HomeInsuranceTodolistPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    AndroidFullScreen,
    Geolocation,
    NativeStorage,
    NativeGeocoder,
    BarcodeScanner,
    Push,
    CallNumber,
    Camera,
    PhotoViewer,
    File,
    ScreenOrientation,
    NativePageTransitions,
    PhotoLibrary,
    Crop,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    LocalJsonServiceProvider,
    GeolocationProvider,
    AuthService,
    StorageServiceProvider,
    MemberServiceProvider,
    MedproviderServiceProvider,
    ClaimServiceProvider,
    Calendar
  ]
})
export class AppModule {
  constructor(public config: Config) {
    this.setCustomTransitions();
}

  private setCustomTransitions() {
      this.config.setTransition('modal-scale-up-leave', ModalScaleUpLeaveTransition);
      this.config.setTransition('modal-scale-up-enter', ModalScaleUpEnterTransition);
  }
}