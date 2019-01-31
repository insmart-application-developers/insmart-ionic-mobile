import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private service:LocalJsonServiceProvider, 
    private mbrService: MemberServiceProvider,
    public storageService: StorageServiceProvider) {
    
    
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
         
          //console.log( "profile account detail : " + this.userprofile.EmailAdr + " " + this.userprofile.CardNo + " " + this.userprofile.UsrStat + " " + profileacct.ClientCode); 
  
          
        };
      })      
    
    
    //   this.service.getMedicalHistoryList().subscribe(res => {
    //   this.medicalhistorys = res;
    // })


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
      }
      else 
      {
             console.log("invalid account");
      };
    }); 
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeHealthcareMedicalhistoryPage');
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
