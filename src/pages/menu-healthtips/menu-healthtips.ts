import { Component,ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, FabContainer } from 'ionic-angular';
import { Slides } from 'ionic-angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number';
import { MenuChatPage } from '../menu-chat/menu-chat';

/**
 * Generated class for the MenuHealthtipsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-healthtips',
  templateUrl: 'menu-healthtips.html',
})
export class MenuHealthtipsPage {
  @ViewChild(Slides) slides: Slides;
  urlImages:any;
  listShowPdf=[
    { id:1,url:'http://docs.google.com/gview?url=https://www.ihealthnet.com.vn/Application/Desktop/DrBinhPromo20181008.pdf&embedded=true' },
    { id:2,url:'http://docs.google.com/gview?url=https://www.ihealthnet.com.vn/Application/Desktop/InsmartHealthTip052018ENG.pdf&embedded=true' },
    { id:3,url:'http://docs.google.com/gview?url=https://www.ihealthnet.com.vn/Application/Desktop/InsmartHealthTip122017ENG.pdf&embedded=true' },
    { id:4,url:'http://docs.google.com/gview?url=https://www.ihealthnet.com.vn/Application/Desktop/GammaKnifeIcon20171102.pdf&embedded=true' },
    { id:5,url:'http://docs.google.com/gview?url=https://www.ihealthnet.com.vn/Application/Desktop/DrBinhPromo20171013.pdf&embedded=true' },
    { id:6,url:'http://docs.google.com/gview?url=https://www.ihealthnet.com.vn/Application/Desktop/InsmartHealthTip102017ENG.pdf&embedded=true' }
  ];
  newShowPdf:any=[];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private callNumber: CallNumber,
    private alertCtrl: AlertController,
    private sanitizer: DomSanitizer
  ) {
    this.urlImages = [
      {url:"assets/imgs/promotion/2018.jpg"},
      {url:"assets/imgs/promotion/2018-2.jpg"},
      {url:"assets/imgs/promotion/2018-3.jpg"},
      {url:"assets/imgs/promotion/Healthtip - Gout overview - EN (1).jpg"},
      {url:"assets/imgs/promotion/Healthtip - Gout overview - EN (2).jpg"},
      {url:"assets/imgs/promotion/Healthtip - Gout overview - EN (3).jpg"}
    ];
    for(let i =0;i< this.listShowPdf.length;i++){
      this.newShowPdf.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.listShowPdf[i].url));
      console.log(this.newShowPdf);
      
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuHealthtipsPage');
  }

  callHotline(fab: FabContainer){
    fab.close();
    console.log("Call 1900656730");
    let alert = this.alertCtrl.create({
      title: 'Call Hotlines',
      message: 'Call 1900656730',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Call',
          handler: () => {
            console.log('Buy clicked');
            if(this.callNumber.isCallSupported()){
              this.callNumber.callNumber("1900656730", true)
              .then(res => console.log('Launched dialer!', res))
              .catch(err => console.log('Error launching dialer', err));
            }else {
              console.log("Thiết bị của bạn không hỗ trợ cuộc gọi !");
            }
          }
        }
      ]
    });
    alert.present();
  }

  chat(fab: FabContainer){
    fab.close();
    console.log("Shared");
    this.navCtrl.push(MenuChatPage);
  }
}
