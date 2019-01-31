import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, ModalController } from 'ionic-angular';
import { HomeInsuranceClaimPage } from './../home-insurance-claim/home-insurance-claim';
import { HomeInsuranceSubmitclaimThankyouPage } from './../home-insurance-submitclaim-thankyou/home-insurance-submitclaim-thankyou';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';
/**
 * Generated class for the HomeInsuranceSubmitclaimDocumentspreviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-insurance-submitclaim-documentspreview',
  templateUrl: 'home-insurance-submitclaim-documentspreview.html',
})
export class HomeInsuranceSubmitclaimDocumentspreviewPage {
  view1:ViewController;
  prepareSubmit:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private localStorge: StorageServiceProvider,
    private view: ViewController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
    ) {
      this.prepareSubmit = navParams.get('userSelect');
      console.log(this.prepareSubmit);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInsuranceSubmitclaimDocumentspreviewPage');
  }
  btnSubmit(){
    const modal = this.modalCtrl.create(HomeInsuranceSubmitclaimThankyouPage,{},{
      enableBackdropDismiss:true
    });
    this.view1 = this.navCtrl.getByIndex(1);
    console.log(this.view1.name);
    this.navCtrl.remove(2,2).then(()=>{
      console.log(this.navCtrl.length());
      
      this.navCtrl.pop().then(()=>{
        this.navCtrl.push(HomeInsuranceClaimPage);
        this.localStorge.removeLocalStorage('photoLibrary');
        modal.present();
      });
    });
  }

  showToast(message,duration,position){
    return this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
  }
}
