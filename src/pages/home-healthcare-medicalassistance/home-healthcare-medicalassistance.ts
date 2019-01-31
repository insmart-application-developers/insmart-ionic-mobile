import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the HomeHealthcareMedicalassistancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-healthcare-medicalassistance',
  templateUrl: 'home-healthcare-medicalassistance.html',
})
export class HomeHealthcareMedicalassistancePage {
  medicalassistances = ['Medical consultation, Evaluation and Referral',
  'Medical Evacuation from hospital to hospital',
  'Medical Repatriation from hospital back to home',
  'Dispatch of Prescribed Medication'];
  selectMedicalAssistance = this.medicalassistances[0];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private callNumber: CallNumber,
    private alertCtrl: AlertController
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeHealthcareMedicalassistancePage');
  }

  callHotline(){
    let alert = this.alertCtrl.create({
      title: 'Call Hotlines',
      message: 'Call 1900656730',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Call',
          handler: () => {
            console.log('Buy clicked');
            if(this.callNumber.isCallSupported()){
              this.callNumber.callNumber("1900656730", true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
            }else {
              console.log("Thiết bị của bạn không hỗ trợ cuộc gọi !");
            }
          }
        }
      ]
    });
    alert.present();
  }
}
