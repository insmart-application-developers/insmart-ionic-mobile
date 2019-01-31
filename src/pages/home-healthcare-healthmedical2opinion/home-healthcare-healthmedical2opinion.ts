import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CallNumber } from '@ionic-native/call-number';

/**
 * Generated class for the HomeHealthcareHealthmedical2opinionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-healthcare-healthmedical2opinion',
  templateUrl: 'home-healthcare-healthmedical2opinion.html',
})
export class HomeHealthcareHealthmedical2opinionPage {
  information: any[];
  formGroup : FormGroup;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private callNumber: CallNumber,
    private alertCtrl: AlertController
  ) {
    this.validation();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeHealthcareHealthmedical2opinionPage');
    
  }

  submitMedical2Opinion(){
    console.log(this.formGroup.value);
  }

  validation(){
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['',Validators.required],
      note: ['']
    });
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
