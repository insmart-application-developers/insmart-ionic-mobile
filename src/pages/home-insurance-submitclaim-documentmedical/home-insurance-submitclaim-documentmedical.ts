import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HomeInsuranceSubmitclaimDocumentCapturePage } from './../home-insurance-submitclaim-document-capture/home-insurance-submitclaim-document-capture';
import { HomeInsuranceSubmitclaimDocumentfinancialPage } from './../home-insurance-submitclaim-documentfinancial/home-insurance-submitclaim-documentfinancial';
import { HomeInsuranceSubmitclaimGuidedentistrydocumentmedicalPage } from './../home-insurance-submitclaim-guidedentistrydocumentmedical/home-insurance-submitclaim-guidedentistrydocumentmedical';
import { HomeInsuranceSubmitclaimDocumentspreviewPage } from './../home-insurance-submitclaim-documentspreview/home-insurance-submitclaim-documentspreview';

@IonicPage()
@Component({
  selector: 'page-home-insurance-submitclaim-documentmedical',
  templateUrl: 'home-insurance-submitclaim-documentmedical.html',
})
export class HomeInsuranceSubmitclaimDocumentMedicalPage {
  listImage:any=[];
  userSelect:any=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController
    ) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInsuranceSubmitclaimDocumentMedicalPage');
  }
  
  async showGuideCTYTR(option){
    let myModal = await this.modalCtrl.create(HomeInsuranceSubmitclaimGuidedentistrydocumentmedicalPage,{select:option},{
      enterAnimation: 'modal-scale-up-enter'
    });
    myModal.present();
  }

  async goCapture(){
    let myModal = await this.modalCtrl.create(HomeInsuranceSubmitclaimDocumentCapturePage);
    myModal.onWillDismiss((imgSelection) => {
      // This is going to be executed when the modal is closed, so
      // you can get the data here
      console.log('Ở Trang chủ: '+ imgSelection);
      if(imgSelection!=null){
        this.userSelect = imgSelection;
        console.log('Danh sách sau khi lấy là: '+this.userSelect);
      }
    });
    myModal.present();
  }

  btnNext(){
    this.navCtrl.push(HomeInsuranceSubmitclaimDocumentspreviewPage,{userSelect:this.userSelect});
  }
}
