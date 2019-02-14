import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the HomeHealthcareMedicalconciergeAppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-healthcare-medicalconcierge-appointments',
  templateUrl: 'home-healthcare-medicalconcierge-appointments.html',
})
export class HomeHealthcareMedicalconciergeAppointmentsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
    ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeHealthcareMedicalconciergeAppointmentsPage');
  }

}
