import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the HospitallistServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalJsonServiceProvider {
  urlHospitalListJson: string = './assets/json/hospital-list.json';
  urlFilterHospitalJson: string = './assets/json/city-filter.json';
  urlSpecialtys: string = './assets/json/specialitys.json';
  urlBenefitLists: string = './assets/json/benefit-list.json';
  urlMedicalHistoryLists : string = './assets/json/medicalhistory-list.json';
  urlClaimLists : string = './assets/json/myclaim-list.json';
  urlTodoLists : string = './assets/json/todo-list.json';
  urlUserInfoLists : string = './assets/json/user-information-list.json';
  urlMemberInfoLists : string = './assets/json/memberinfo.json';
  urlSymptom : string = './assets/json/symptom.json';
  constructor(public http: Http) {
    console.log('Hello HospitallistServiceProvider Provider');
  }

  getHospitalList() {
    return this.http.get(this.urlHospitalListJson)
    .map(res => res.json());
  }

  getFilterHospitalList() {
    return this.http.get(this.urlFilterHospitalJson)
    .map(res => res.json());
  }

  getSpecialList() {
    return this.http.get(this.urlSpecialtys)
    .map(res => res.json());
  }

  getBenefitList() {
    return this.http.get(this.urlBenefitLists)
    .map(res => res.json());
  }

  getMedicalHistoryList() {
    return this.http.get(this.urlMedicalHistoryLists)
    .map(res => res.json());
  }

  getClaimList() {
    return this.http.get(this.urlClaimLists)
    .map(res => res.json());
  }

  getTodoList() {
    return this.http.get(this.urlTodoLists)
    .map(res => res.json());
  }
  getUserInfoList() {
    return this.http.get(this.urlUserInfoLists)
    .map(res => res.json());
  }
  getMemberInfor() {
    return this.http.get(this.urlMemberInfoLists)
    .map(res => res.json());
  }
  getSymptom() {
    return this.http.get(this.urlSymptom)
    .map(res => res.json());
  }
}
