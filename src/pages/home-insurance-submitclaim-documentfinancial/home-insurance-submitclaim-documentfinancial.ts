import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomeInsuranceSubmitclaimDocumentCapturePage } from './../home-insurance-submitclaim-document-capture/home-insurance-submitclaim-document-capture';
import { HomeInsuranceSubmitclaimDocumentdifferencePage } from './../home-insurance-submitclaim-documentdifference/home-insurance-submitclaim-documentdifference';
/**
 * Generated class for the HomeInsuranceSubmitclaimDocumentfinancialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-insurance-submitclaim-documentfinancial',
  templateUrl: 'home-insurance-submitclaim-documentfinancial.html',
})
export class HomeInsuranceSubmitclaimDocumentfinancialPage {

  listImage:any=[];
  userSelect:any=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController
    ) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInsuranceSubmitclaimDocumentfinancialPage');
  }

  async goCapture(){
    let myModal = this.modalCtrl.create(HomeInsuranceSubmitclaimDocumentCapturePage);
    myModal.onWillDismiss((imgSelection) => {
      // This is going to be executed when the modal is closed, so
      // you can get the data here
      console.log('Ở Trang chủ: '+ imgSelection);
      if(imgSelection!=null){
        this.userSelect = imgSelection.filter((element) => {
          return element.checked === true;
        });;
        console.log('Danh sách sau khi lấy là: '+this.userSelect);
      }
    });
    myModal.present();
  }

  btnNext(){
    this.navCtrl.push(HomeInsuranceSubmitclaimDocumentdifferencePage);
  }
}
