import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MemberServiceProvider } from '../../providers/member-service/member-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';


/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notifications:any[];
  shownGroup = null;
  userprofile:any;
  cardno:String;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
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
 
          this.getAnnouncementList(this.cardno, this.userprofile.UsrId);
         
          //console.log( "profile account detail : " + this.userprofile.EmailAdr + " " + this.userprofile.CardNo + " " + this.userprofile.UsrStat + " " + profileacct.ClientCode); 
  
          
        };
      })      
    
  }

  getAnnouncementList(sCardNo:String, strUsrLgn:String) {

    console.log("Start Call announcement Service" + strUsrLgn); 
  
    this.mbrService.GetAnnouncementList(sCardNo, strUsrLgn).subscribe( (data) => 
    { 
      console.log("subscribe return"); 
      
      console.log("get announcement data : " + data);
  
      if( data && data !== "null" && data !== "undefined" ) {
        var obj = JSON.parse(data);
        this.notifications = obj;
      }
      else 
      {
             console.log("invalid account");
      };
    }); 
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
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
