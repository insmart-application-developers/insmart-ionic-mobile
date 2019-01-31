import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the HomeInsuranceSubmitclaimThankyouPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-insurance-submitclaim-thankyou',
  templateUrl: 'home-insurance-submitclaim-thankyou.html',
})
export class HomeInsuranceSubmitclaimThankyouPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl:ViewController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInsuranceSubmitclaimThankyouPage');
  }

}
