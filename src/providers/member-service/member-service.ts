//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

/*
  Generated class for the MemberServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MemberServiceProvider {

  constructor(public http: Http) {
    console.log('Hello MemberServiceProvider Provider');
  }



  public GetMbrClaim(cardno) {
    

    //let clmURL = 'http://localhost:55565/api/ClmSvs?Cardno=' + cardno;
    let clmURL = 'http://210.245.8.8:5555/api/ClmSvs?Cardno=' + cardno;
    
    
    
    console.log("server call" + cardno);

    return this.http.get(clmURL).map(res => res.json()).catch(this.handleError);

    //console.log("server response");

    ///this.http.get(loginURL).map(res => res.json()).subscribe(data => { strdata = data;  console.log("data output" + strdata); });

  }

  public GetMbrBenefitUtil(cardno) {
    

    //let mbrbenURL = 'http://localhost:55565/api/ClmSvs?CardNo=' + cardno + '&CardIdtId=sdf&AuthID=0';
    let mbrbenURL = 'http://210.245.8.8:5555/api/ClmSvs?CardNo=' + cardno + '&CardIdtId=sdf&AuthID=0';

    
    console.log("server call " + cardno);

    return this.http.get(mbrbenURL).map(res => res.json()).catch(this.handleError);

    //console.log("server response");

    ///this.http.get(loginURL).map(res => res.json()).subscribe(data => { strdata = data;  console.log("data output" + strdata); });

  }

  public GetMbrBenefitFilterOpt(cardno) {
    

    //let lookURL = 'http://localhost:55565/api/AppLookup?Lookup=13100850&AuthID=ee';
    let lookURL = 'http://210.245.8.8:5555/api/AppLookup?Lookup=13100850&AuthID=ee';

    
    console.log("server call Display Option of Benefit" + cardno);

    return this.http.get(lookURL).map(res => res.json()).catch(this.handleError);

    //console.log("server response");

    ///this.http.get(loginURL).map(res => res.json()).subscribe(data => { strdata = data;  console.log("data output" + strdata); });

  }

  public GetMbrBenefitTypes(cardno) {
    

    //let lookURL = 'http://localhost:55565/api/ClmSvs?CardNo=' + cardno + '&CardIdtId=sdf&AuthID=1';
    let lookURL = 'http://210.245.8.8:5555/api/ClmSvs?CardNo=' + cardno + '&CardIdtId=sdf&AuthID=1';
    
    
    console.log("server call Benefit Type - " + cardno);

    return this.http.get(lookURL).map(res => res.json()).catch(this.handleError);

    //console.log("server response");

    ///this.http.get(loginURL).map(res => res.json()).subscribe(data => { strdata = data;  console.log("data output" + strdata); });

  }

  public GetMbrToDoList(cardno) {
    

    //let lookURL = 'http://localhost:55565/api/ClmSvs?MemberId=' + cardno + '&test=sdf' //+ cardno + '&CardIdtId=sdf&AuthID=1';
    let lookURL = 'http://210.245.8.8:5555/api/ClmSvs?MemberId=' + cardno + '&test=sdf' //+ cardno + '&CardIdtId=sdf&AuthID=1';
    
    
    console.log("server call Member To Do List - " + cardno);

    return this.http.get(lookURL).map(res => res.json()).catch(this.handleError);

    //console.log("server response");

    ///this.http.get(loginURL).map(res => res.json()).subscribe(data => { strdata = data;  console.log("data output" + strdata); });

  }

  public GetMbrPastMedicalHistory(cardno) {
    


    //let clmURL = 'http://localhost:55565/api/ClmSvs?CardNo=' + cardno + '&CardIdtId=sdf&Opt=MEDHIS&AuthID=0';
    let clmURL = 'http://210.245.8.8:5555/api/ClmSvs?CardNo=' + cardno + '&CardIdtId=sdf&Opt=MEDHIS&AuthID=0';
    
    console.log("server call" + cardno);

    return this.http.get(clmURL).map(res => res.json()).catch(this.handleError);

    //console.log("server response");

    ///this.http.get(loginURL).map(res => res.json()).subscribe(data => { strdata = data;  console.log("data output" + strdata); });

  }

  public GetMbrHthScnList(cardno) {
    


    //let clmURL = 'http://localhost:55565/api/ClmSvs?CardNo=' + cardno + '&CardIdtId=sdf&Opt=HTHSCN&AuthID=0';
    let clmURL = 'http://210.245.8.8:5555/api/ClmSvs?CardNo=' + cardno + '&CardIdtId=sdf&Opt=HTHSCN&AuthID=0';
    
    console.log("server HTH call" + cardno);

    return this.http.get(clmURL).map(res => res.json()).catch(this.handleError);

    //console.log("server response");

    ///this.http.get(loginURL).map(res => res.json()).subscribe(data => { strdata = data;  console.log("data output" + strdata); });

  }

  public GetAnnouncementList(cardno, usrLgn) {
    


    //let clmURL = 'http://localhost:55565/api/ClmSvs?CardNo=' + cardno + '&CardIdtId=sdf&Opt=ANNNOM&AuthID='+ usrLgn;
    let clmURL = 'http://210.245.8.8:5555/api/ClmSvs?CardNo=' + cardno + '&CardIdtId=sdf&Opt=ANNNOM&AuthID='+ usrLgn;
    
    console.log("server HTH call" + clmURL);

    return this.http.get(clmURL).map(res => res.json()).catch(this.handleError);

    //console.log("server response");


  }

  handleError(error) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }  



}
