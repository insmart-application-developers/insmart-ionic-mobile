import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MenuUserinformationModalPage } from '../menu-userinformation-modal/menu-userinformation-modal'
import { StorageServiceProvider } from './../../providers/storage-service/storage-service';

/**
 * Generated class for the MenuUserinformationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-userinformation',
  templateUrl: 'menu-userinformation.html',
  providers:[DatePipe]
})
export class MenuUserinformationPage {
  // userInformations:any;
  formGroup : FormGroup;
  clock:any = Date.now();
  createCode = null;
  userprofile:any;
  oUsrMemberInfo:any;
  userAvatar:any="assets/imgs/avatar-default.jpg";
  userName:String="";
  userCardNo:String="";
  userExpiryDate:String="";
  MbrProductName:String="";
  MbrPayorName:String="";
  MbrIdentityId:String="";
  MbrAddr:String="";
  MbrGender:String="";
  MbrContactNo:String="";
  MbrBirthDate :string="";
  
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private modalCtrl: ModalController,
    public storageService: StorageServiceProvider
  ) {
    
    
    console.log("call storage data"); 
    this.storageService.getLocalStorage("profileacct").then( (profiledata) => {
        
      console.log("return storage data");
      this.userprofile = profiledata;
      console.log("get storage data : " + this.userprofile);
      if(this.userprofile != null){
        console.log("profile account : " + this.userprofile);
        console.log("profile account detail : " + this.userprofile.UsrName + ' '+ this.userprofile.CardNo);
        this.userName  = this.userprofile.UsrName;
        this.userCardNo = this.userprofile.CardNo;
        this.userExpiryDate = this.userprofile.ExpiryDate;
        this.createCode = this.userprofile.CardNo;;

        this.oUsrMemberInfo = this.userprofile.UsrMemberInfo;

        this.MbrProductName = this.oUsrMemberInfo.ProductName;
        this.MbrPayorName = this.oUsrMemberInfo.PayorName;
        this.MbrIdentityId = this.oUsrMemberInfo.CurrentID1;
        this.MbrAddr = this.oUsrMemberInfo.Addr1;
        this.MbrGender = this.oUsrMemberInfo.Gender;
        
        this.MbrBirthDate = this.datePipe.transform(this.oUsrMemberInfo.BirthDate,"yyyy-dd-MM");
        this.MbrContactNo = this.oUsrMemberInfo.ContactNo;
        
        console.log("Ngày sinh: "+ this.MbrBirthDate);
        
      };
    })      
    
    let userInformations = this.navParams.get('userinfor');
    if(userInformations.avatar != null){
      this.userAvatar = userInformations.avatar;
    }
    
    this.validation(userInformations);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuUserinformationPage');
    this.tick();
    this.createQRCode();
  }

  tick() {
    setInterval(()=>{
      this.clock = Date.now();
    },1000);
  }

  createQRCode(){
    //this.createCode = "FART350911025525";
  }

  submitUserInfo(){
    console.log(this.formGroup.value);
  }

  changeAvatar(){
    let myModal = this.modalCtrl.create(MenuUserinformationModalPage);
    myModal.onWillDismiss((data) => {
      // This is going to be executed when the modal is closed, so
      // you can get the data here
      if(data!=null){
        this.userAvatar = data;
      }
      
    });
    myModal.present();
  }

  validation(userInformations){
    this.formGroup = this.formBuilder.group({
      id: [userInformations.id.toString(), Validators.required],
      name: [userInformations.name, Validators.required],
      address: [userInformations.address,Validators.required],
      phonenumber: [userInformations.phonenumber,Validators.required],
      birthday: [userInformations.birthday,Validators.required],
      gender:  [userInformations.gender,Validators.required]
    });
    
  }
}
