import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomeInsuranceSubmitclaimGuidePage } from './../home-insurance-submitclaim-guide/home-insurance-submitclaim-guide';
import { HomeInsuranceSubmitclaimDocumentMedicalPage } from './../home-insurance-submitclaim-documentmedical/home-insurance-submitclaim-documentmedical';
/**
 * Generated class for the HomeInsuranceSubmitclaimPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-insurance-submitclaim',
  templateUrl: 'home-insurance-submitclaim.html',
})
export class HomeInsuranceSubmitclaimPage {
  submitClaim = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController
    ) {
    this.showGuide();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInsuranceSubmitclaimPage');
  }

  requestClaim() {
    console.log(this.submitClaim);
    this.navCtrl.push(HomeInsuranceSubmitclaimDocumentMedicalPage);
  }

  showGuide(){
    let myModal = this.modalCtrl.create(HomeInsuranceSubmitclaimGuidePage,{},{
      enterAnimation: 'modal-scale-up-enter'
    });
    myModal.present();
  }
}
