import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { LocalJsonServiceProvider } from '../../providers/localjson-service/localjson-service'
import { MemberServiceProvider } from '../../providers/member-service/member-service';
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';

/**
 * Generated class for the HomeInsuranceTodolistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home-insurance-todolist',
  templateUrl: 'home-insurance-todolist.html',
})
export class HomeInsuranceTodolistPage {
  todolist:any=[];
  userprofile:any;
  cardno:string;
  loadingSpinner:Loading;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    private service: LocalJsonServiceProvider,
    private mbrService: MemberServiceProvider,
    public storageService: StorageServiceProvider
    ) {
    // this.service.getTodoList().subscribe((res) => {
    //   this.todolist = res;
    //   console.log(this.todolist);
    // });

    this.storageService.getLocalStorage("profileacct").then( (profiledata) => {
          
      console.log("return storage data");
      this.userprofile = profiledata;
      console.log("get storage data : " + this.userprofile); 
      if(this.userprofile != null){
        console.log("profile account detail : " + this.userprofile.UsrName + ' '+ this.userprofile.CardNo);
        this.cardno = this.userprofile.CardNo;
        console.log("card no from local storage : " + this.cardno);

        this.getTodoList(this.cardno);
      };
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeInsuranceTodolistPage');
    this.loadingSpinner = this.loadingCtrl.create({
      content: 'Loading To do list...'
    });
    this.loadingSpinner.present();
    setTimeout(() => {
      if(this.loadingSpinner){
        this.loadingSpinner.dismiss();
      }
    }, 15000);
  }

  getTodoList(strCardno:string){
    this.mbrService.GetMbrToDoList(strCardno).subscribe((data)=>{
      if( data && data !== "null" && data !== "undefined" ) {
        var obj = JSON.parse(data);
        this.todolist = obj;
        console.log("Danh sach to do list",this.todolist);
        this.loadingSpinner.dismiss();
      }
      else 
      {
        console.log("invalid account");
        this.loadingSpinner.dismiss();
      };
    });
  }

  ionViewWillLeave() {
    this.loadingSpinner.dismissAll();
  }
}
