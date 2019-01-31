import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomeInsuranceBenefitPage } from '../home-insurance-benefit/home-insurance-benefit';
import { HomeInsuranceClaimPage } from '../home-insurance-claim/home-insurance-claim';
import { HomeInsuranceDirectbillingPage } from '../home-insurance-directbilling/home-insurance-directbilling';
import { HomeInsuranceSubmitclaimPage } from '../home-insurance-submitclaim/home-insurance-submitclaim';
import { HomeInsuranceTodolistPage } from '../home-insurance-todolist/home-insurance-todolist';

/**
 * Generated class for the InsurancePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-insurance',
  templateUrl: 'insurance.html',
})
export class InsurancePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InsurancePage');
  }

  doMyclaim(){
    this.navCtrl.push(HomeInsuranceClaimPage);
  }

  doMybenefit(){
    this.navCtrl.push(HomeInsuranceBenefitPage);
  }

  doTodoList(){
    this.navCtrl.push(HomeInsuranceTodolistPage);
  }

  doDirectBillingPanel(){
    this.navCtrl.push(HomeInsuranceDirectbillingPage);
  }

  doSubmitClaim(){
    this.navCtrl.push(HomeInsuranceSubmitclaimPage);
  }
}
