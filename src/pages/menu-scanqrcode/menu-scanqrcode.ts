import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { LocalJsonServiceProvider } from '../../providers/localjson-service/localjson-service';

/**
 * Generated class for the MenuScanqrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-scanqrcode',
  templateUrl: 'menu-scanqrcode.html',
  providers:[LocalJsonServiceProvider]
})
export class MenuScanqrcodePage {
  memberInfo:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private barcodeScanner: BarcodeScanner,
    private service: LocalJsonServiceProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuScanqrcodePage');
  }

  btnScan(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.service.getMemberInfor().subscribe(member =>{
        if(barcodeData.text === member.id){
          this.memberInfo = member;
        } else {
          alert("The code is not under the control of insmart");
        }
      });
      console.log('Barcode data', barcodeData);
    }).catch(err => {
        console.log('Error', err);
    });
  }
}
