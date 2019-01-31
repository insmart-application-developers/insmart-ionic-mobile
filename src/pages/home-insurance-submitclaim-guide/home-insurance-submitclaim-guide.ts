import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the HomeInsuranceSubmitclaimGuidePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-insurance-submitclaim-guide',
  templateUrl: 'home-insurance-submitclaim-guide.html',
})
export class HomeInsuranceSubmitclaimGuidePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl : ViewController,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInsuranceSubmitclaimGuidePage');
  }
  start(){
    this.viewCtrl.dismiss();
  }

}
