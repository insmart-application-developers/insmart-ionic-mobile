import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeInsuranceSubmitclaimDocumentspreviewPage } from './../home-insurance-submitclaim-documentspreview/home-insurance-submitclaim-documentspreview';
/**
 * Generated class for the HomeInsuranceSubmitclaimDocumentdifferencePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-insurance-submitclaim-documentdifference',
  templateUrl: 'home-insurance-submitclaim-documentdifference.html',
})
export class HomeInsuranceSubmitclaimDocumentdifferencePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInsuranceSubmitclaimDocumentdifferencePage');
  }

  btnPreview(){
    this.navCtrl.push(HomeInsuranceSubmitclaimDocumentspreviewPage);
  }
}
