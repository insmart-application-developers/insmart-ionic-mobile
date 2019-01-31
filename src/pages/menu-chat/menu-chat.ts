import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

/**
 * Generated class for the MenuChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-chat',
  templateUrl: 'menu-chat.html',
})
export class MenuChatPage {
  messages = [];
  nickname = Date.now();;
  message='';
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private socket:Socket,
    private toastCtrl:ToastController
    ) {
      this.socket.connect();
      this.socket.emit('set-nickname', this.nickname);
      this.getMessages().subscribe(message =>{
        this.messages.push(message);
      });

      this.getUsers().subscribe(data=>{
        let user = data['user'];
        if(data['event'] === 'left'){
          this.showToast('User left: ' + user);
        }else{
          this.showToast('User joined: '+ user);
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuChatPage');
  }

  getUsers(){
    let observable = new Observable(observer =>{
      this.socket.on('users-changed', data =>{
        observer.next(data);
      })
    });
    return observable;
  }

  sendMessage(){
    this.socket.emit('add-message',{text:this.message});
    this.message ='';
  }

  getMessages(){
    let observable = new Observable(observer =>{
      this.socket.on('message', data =>{
        observer.next(data);
      })
    });
    return observable;
  }

  showToast(msg){
    let toast = this.toastCtrl.create({
      message:msg,
      duration:2000
    });
    toast.present();
  }

  ionViewWillLeave(){
    this.socket.disconnect();
  }
}
