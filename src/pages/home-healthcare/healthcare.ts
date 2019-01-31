import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FindingmedicalprovidersPage } from '../home-healthcare-findingmedicalproviders/findingmedicalproviders';
import { HomeHealthcareHealthmedical2opinionPage } from '../home-healthcare-healthmedical2opinion/home-healthcare-healthmedical2opinion';
import { HomeHealthcareHealthscreeningPage } from '../home-healthcare-healthscreening/home-healthcare-healthscreening';
import { HomeHealthcareMedicalassistancePage } from '../home-healthcare-medicalassistance/home-healthcare-medicalassistance';
import { HomeHealthcareMedicalconciergePage } from '../home-healthcare-medicalconcierge/home-healthcare-medicalconcierge';
import { HomeHealthcareMedicalhistoryPage } from '../home-healthcare-medicalhistory/home-healthcare-medicalhistory';



/**
 * Generated class for the HealthcarePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-healthcare',
  templateUrl: 'healthcare.html'
})
export class HealthcarePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HealthcarePage');
  }

  doMedicalHistory(){
    this.navCtrl.push(HomeHealthcareMedicalhistoryPage);
  }

  doHealthScreening(){
    this.navCtrl.push(HomeHealthcareHealthscreeningPage);
  }

  doMedicalSecondOpinion(){
    this.navCtrl.push(HomeHealthcareHealthmedical2opinionPage);
  }

  doFindingmedicalprovider(){
    this.navCtrl.push(FindingmedicalprovidersPage);
  }

  doMedicalConcierge(){
    this.navCtrl.push(HomeHealthcareMedicalconciergePage);
  }

  doMedicalAssistance(){
    this.navCtrl.push(HomeHealthcareMedicalassistancePage);
  }
}
