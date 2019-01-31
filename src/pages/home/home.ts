import { Component} from '@angular/core';
import { NavController } from 'ionic-angular';
import { HealthcarePage } from '../home-healthcare/healthcare';
import { InsurancePage } from '../home-insurance/insurance';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {

  }
  showHealthCare(){
    this.navCtrl.push(HealthcarePage);
  }
  showInsurance(){
    this.navCtrl.push(InsurancePage);
  }
}
