import { Component, ViewChild } from '@angular/core';
import { App, Nav, Platform, ToastController,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidFullScreen } from '@ionic-native/android-full-screen';
import { TranslateService } from '@ngx-translate/core';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { LoginPage } from '../pages/login/login'
import { MenuUserinformationPage } from '../pages/menu-userinformation/menu-userinformation'
import { HomePage } from '../pages/home/home';
import { NotificationPage } from '../pages/menu-notification/notification';
import { MenuInfoPage } from '../pages/menu-info/menu-info';
import { MenuScanqrcodePage } from '../pages/menu-scanqrcode/menu-scanqrcode';
import { MenuHealthtipsPage } from '../pages/menu-healthtips/menu-healthtips';

import { LocalJsonServiceProvider } from './../providers/localjson-service/localjson-service';
import { StorageServiceProvider } from './../providers/storage-service/storage-service';
import { NetworkProvider } from './../providers/network-service/network-service';
import { Observable } from 'rxjs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  ckPlatform:boolean;
  rootPage: any;
  pages: Array<{title: string, component: any,icon:String}>;
  userAvatar:String="assets/imgs/personal-avatar-default.jpg";
  userName:String="";
  showAlert:boolean = false;
  userInformations:any;
  constructor(
    private app: App,
    public platform: Platform,
    public events: Events,
    private toastCtrl: ToastController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private service: LocalJsonServiceProvider,
    private storageService: StorageServiceProvider,
    private push: Push,
    public translate: TranslateService,
    private androidFullScreen: AndroidFullScreen,
    private screenOrientation: ScreenOrientation,
    public networkProvider: NetworkProvider
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon:"home" },
      { title: 'Notification', component: NotificationPage, icon:"notifications" },
      { title: 'Info', component: MenuInfoPage, icon:"information-circle" },
      { title: 'Scan QRcode', component: MenuScanqrcodePage, icon:"qr-scanner" },
      { title: 'Health tips', component: MenuHealthtipsPage, icon:"medkit" },
      { title: 'Logout', component: LoginPage, icon:"power" }
    ];
    this.service.getUserInfoList().subscribe( res => {
      this.userInformations = res;
      if(this.userInformations.avatar != null){
        this.userAvatar = this.userInformations.avatar;
      }
    });
    this.getUserInformation().subscribe((UsrName) => {
      this.userName = UsrName.toString();
       
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.hide();
      this.splashScreen.hide();
      if(this.platform.is('android') && this.platform.is('cordova')){
        this.androidFullScreen.isImmersiveModeSupported().then(() => {
          console.log('Immersive mode supported');
          this.statusBar.hide();
          this.splashScreen.hide();
        }).catch(err => 
          console.log(err)
        );
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT_PRIMARY);
      }
      this.checkPlatform();
      this.initTranslate();
      this.pushNoti();
      this.Authen();
      this.confirmExitApp();
      this.checkNetwork();
    });
  }

  checkNetwork(){
    this.networkProvider.initializeNetworkEvents();
	  // Offline event
    this.events.subscribe('network:offline', () => {
      console.log("There is no network connection");
      
      this.toastCtrl.create({
        message:"There is no network connection",
        duration:2000,
        position:"bottom",
        dismissOnPageChange:true
      }).present();
    });

    // Online event
    this.events.subscribe('network:online', () => {
      console.log("The network connected");
      
      this.toastCtrl.create({
        message:"The network connected",
        duration:2000,
        position:"bottom",
        dismissOnPageChange:true
      }).present();
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      console.log(this.translate.getBrowserLang());
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }
  }

  Authen():void{
    this.storageService.getStorage('account').then((data) => {
      if(data === "undefined" || data === null) {
        this.rootPage = LoginPage;
      } else {
        this.rootPage = HomePage;
      }
    }, (error) => {
      this.rootPage = LoginPage;
      console.error("Lỗi "+error)
    });
  }

  getUserInformation(){
    let observable = new Observable(observer =>{ 
      this.storageService.getLocalStorage("profileacct").then((profiledata) => {
        if(profiledata != null){
          console.log(profiledata.UsrName);
          observer.next(profiledata.UsrName);
        };
      });
    })
    return observable;
  }

  userInfomation(){
    this.nav.push(MenuUserinformationPage,{"userinfor":this.userInformations});
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component == LoginPage){
      console.log("Logout");

      this.storageService.removeStorage('account').then(()=>
      //this.storageService.clearLocalStorage('profileacct').then(()=>
        console.log('Deleted'),
        error => console.error(error)
      );
      this.nav.setRoot(LoginPage);
      this.nav.popToRoot();
    }else{
      this.nav.setRoot(page.component);
    }
  }

  pushNoti(){
    // to initialize push notifications
    const options: PushOptions = {
      android: {
        senderID:'998849687471',
        sound:'true',
        vibrate:'true'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    };
  
    const pushObject: PushObject = this.push.init(options);
    
    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
  
  }
  
  checkPlatform(){
    if(this.platform.is('ios')){
      console.log("Platform ios");
      // this.ckPlatform = true;
      this.nav.swipeBackEnabled = true;
    }
    else{
      console.log("The Difference Platform");
      // this.ckPlatform = false;
      this.nav.swipeBackEnabled = false;
    }
  }

  confirmExitApp(){
    let backNumber = 0;
    this.platform.registerBackButtonAction(async() => {
      let nav = this.app.getActiveNavs()[0];
      let activeView = nav.getActive();
      
      if(activeView.name === "HomePage" || activeView.name === "LoginPage") {
        if(backNumber == 0){
          backNumber++;
          this.toastCtrl.create({
            message:"Press again to exit ",
            duration:2000,
            position:"bottom",
            dismissOnPageChange:true
          }).present().then(()=>setTimeout(() => {
            backNumber=0;
          }, 2000));
        }else{
          this.platform.exitApp();
        }
      }else if(activeView.name === "NotificationPage" || activeView.name === "MenuInfoPage" || activeView.name === "MenuScanqrcodePage" || activeView.name === "MenuHealthtipsPage"){
        this.nav.setRoot(HomePage);
      }else if(activeView.name === "ModalCmp"){
        nav.pop();
      }
      else if (nav.canGoBack()){ //Can we go back?
        nav.pop();
      }
    });
  }
}
