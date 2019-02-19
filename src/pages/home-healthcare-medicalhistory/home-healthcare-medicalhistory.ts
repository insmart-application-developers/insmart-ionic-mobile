import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading } from 'ionic-angular';
import { LocalJsonServiceProvider } from '../../providers/localjson-service/localjson-service';
import { MemberServiceProvider } from '../../providers/member-service/member-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';

/**
 * Generated class for the HomeHealthcareMedicalhistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-healthcare-medicalhistory',
  templateUrl: 'home-healthcare-medicalhistory.html',
})
export class HomeHealthcareMedicalhistoryPage {
  medicalhistorys:any[];
  shownGroup = null;
  userprofile:any;
  cardno:String;
  loadingSpinner:Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private mbrService: MemberServiceProvider,
    public storageService: StorageServiceProvider
    ) {

      console.log("call storage data"); 

      this.storageService.getLocalStorage("profileacct").then( (profiledata) => {
          
        console.log("return storage data");
        this.userprofile = profiledata;
        console.log("get storage data : " + this.userprofile); 
        if(this.userprofile != null){
          console.log("profile account detail : " + this.userprofile.UsrName + ' '+ this.userprofile.CardNo);
          this.cardno = this.userprofile.CardNo;
          console.log("card no from local storage : " + this.cardno);
 
          this.getMedicalHistoryList(this.cardno);
        };
      });

  }
  
  getMedicalHistoryList(strCardno:String) {

    console.log("Start Call Member History Service" + strCardno); 
  
    this.mbrService.GetMbrPastMedicalHistory(strCardno).subscribe( (data) => 
    { 
      console.log("subscribe return"); 
      
      console.log("get member history data : " + data);
  
      if( data && data !== "null" && data !== "undefined" ) {
        var obj = JSON.parse(data);
        this.medicalhistorys = obj;
        this.loadingSpinner.dismiss();
      }
      else 
      {
        console.log("invalid account");
        this.loadingSpinner.dismiss();
      };
    }); 
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeHealthcareMedicalhistoryPage');
    this.loadingSpinner = this.loadingCtrl.create({
      content: 'Finding health facilities near your location'
    });
    this.loadingSpinner.present();
  }

  toggleGroup(group) {
    if (this.isGroupShown(group)) {
      this.shownGroup = null;
    } else {
      this.shownGroup = group;
    }
  };
  isGroupShown(group) {
    return this.shownGroup === group;
  };
  
}
