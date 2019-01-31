import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the HomeInsuranceSubmitclaimGuidedentistrydocumentmedicalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-insurance-submitclaim-guidedentistrydocumentmedical',
  templateUrl: 'home-insurance-submitclaim-guidedentistrydocumentmedical.html',
})
export class HomeInsuranceSubmitclaimGuidedentistrydocumentmedicalPage {
  options:number;
  urlDocuments:any=
  [{id:1,url:"assets/imgs/ctyt-sokham.png"},
  {id:2,url:"assets/imgs/ctyt-donthuoc.png"}];
  urlShow:string="";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    ) {
      this.options = navParams.get('select');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInsuranceSubmitclaimGuidedentistrydocumentmedicalPage');
    console.log(this.selectURL());
  }
  selectURL(){
    this.urlDocuments.filter((url)=>{
      if(url.id===this.options){
        console.log("Log thử xem sao: "+url.url);
        this.urlShow = url.url;
      }
    });
  }
}
