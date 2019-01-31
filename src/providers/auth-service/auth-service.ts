import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

export class User {
  username: string;
  password: string;
 
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
 
@Injectable()
export class AuthService {
  currentUser: User;

  constructor(public http: Http) {
    //console.log('Hello HospitallistServiceProvider Provider');
  }


 login(credentials) {
    
    let username = credentials.username;
    let password = credentials.password;

    let strLoginPwd = '{UserId:"' + username + '",UserPwd:"' + password + '"}';
    //let loginURL = 'http://localhost:55565/api/Authenticate?jsonUserLogin=' + strLoginPwd;
    let loginURL = 'http://210.245.8.8:5555/api/Authenticate?jsonUserLogin=' + strLoginPwd;
    
    
    console.log("server call" + strLoginPwd);

    return this.http.get(loginURL).map(res => res.json()).catch(this.handleError);  

  // return Observable.create(observer => {
  //     // At this point make a request to your backend to make a real check!
  //     this.currentUser = new User('trant', 'pass');
  //     let access = 
  //     (credentials.username === this.currentUser.username && credentials.password === this.currentUser.password);
  //     observer.next(access);
  //     observer.complete();
  //   });



  }
  
  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }

}