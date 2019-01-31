//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


/*
  Generated class for the MedproviderServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MedproviderServiceProvider {

  constructor(public http: Http) {
    console.log('Hello MedproviderServiceProvider Provider');
  }


  public GetMbrProviderList(cardno) {
    

    //let MedPvrURL = 'http://localhost:55565/api/MedPvrClnts' // + cardno;
    let MedPvrURL = 'http://210.245.8.8:5555/api/MedPvrClnts' // + cardno;
    
    
    console.log("server call medical provider list");

    return this.http.get(MedPvrURL).map(res => res.json()).catch(this.handleError);

    //console.log("server response");

    ///this.http.get(loginURL).map(res => res.json()).subscribe(data => { strdata = data;  console.log("data output" + strdata); });

  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  } 

  public GetCityList(cardno) {
    
    //let MedPvrURL = './assets/json/city-filter.json';
    //let MedPvrURL = 'http://localhost:55565/api/MedPvrClnts?LookupCode=VNM' // + cardno;
    let MedPvrURL = 'http://210.245.8.8:5555/api/MedPvrClnts?LookupCode=VNM' // + cardno;
    
    
    console.log("server call city lookup list");

    return this.http.get(MedPvrURL).map(res => res.json()).catch(this.handleError);
    //return this.http.get(MedPvrURL).map(res => {console.log("data output" + res.json()); } ).catch(this.handleError);

  }

}
