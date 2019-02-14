import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs, Platform } from 'ionic-angular';
import { HomeHealthcareMedicalconciergeBooknewPage } from './../home-healthcare-medicalconcierge-booknew/home-healthcare-medicalconcierge-booknew';
import { HomeHealthcareMedicalconciergeAppointmentsPage } from './../home-healthcare-medicalconcierge-appointments/home-healthcare-medicalconcierge-appointments';
import { HomeHealthcareMedicalconciergeAboutPage } from './../home-healthcare-medicalconcierge-about/home-healthcare-medicalconcierge-about';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';

@IonicPage()
@Component({
  selector: 'page-home-healthcare-medicalconcierge',
  templateUrl: 'home-healthcare-medicalconcierge.html',
  providers:[GeolocationProvider]
})
export class HomeHealthcareMedicalconciergePage {
  @ViewChild('tabBooking') tabBooking:Tabs;
  appointments = HomeHealthcareMedicalconciergeAppointmentsPage;
  booknew = HomeHealthcareMedicalconciergeBooknewPage;
  about = HomeHealthcareMedicalconciergeAboutPage;
  paramsId:any;
  loaded:   boolean = false; 
  tabIndex: number  = 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private platform:Platform,
    private nativePageTransitions: NativePageTransitions
  ) {
    this.paramsId = {booknew:navParams.get('id')};
    console.log(this.paramsId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeHealthcareMedicalconciergePage');
    this.tabBooking.select(1);
  }

  private getAnimationDirection(index):string {
    var currentIndex = this.tabIndex;
  
    this.tabIndex = index;
  
    switch (true){
      case (currentIndex < index):
        return('left');
      case (currentIndex > index):
        return ('right');
    }
  }

  transition(e){
    let options: NativeTransitionOptions = {
      direction:this.getAnimationDirection(e.index),
      duration: 250,
      slowdownfactor: -1,
      slidePixels: 0,
      iosdelay: 20,
      androiddelay: 0,
      fixedPixelsTop: this.getPlatform(),
      fixedPixelsBottom: 56
    };
    if(!this.loaded) {
      this.loaded = true;
      return;
    }
      this.nativePageTransitions.slide(options);
  }
  getPlatform():number{
    if(this.platform.is('android')){
      return 56;
    }else if(this.platform.is('ios')){
      return 44;
    }
  }
}
