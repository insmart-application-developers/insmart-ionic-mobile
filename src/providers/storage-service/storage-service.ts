import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';

/*
  Generated class for the StorageServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageServiceProvider {

  constructor(private nativeStorage: NativeStorage, 
    private storage: Storage) {
    console.log('Hello StorageServiceProvider Provider');
  }

  setStorage(key,value){
    return this.nativeStorage.setItem(key, value);
  }

  getStorage(key){
    return this.nativeStorage.getItem(key);
  }

  removeStorage(key){
    return this.nativeStorage.remove(key);
  }

  setLocalStorage(key, value) {
    this.storage.set(key, value);
  } 

  getLocalStorage(key): Promise<any> {
    return this.storage.get(key);
  }

  removeLocalStorage(key){
    return this.storage.remove(key);
  }

  clearLocalStorage() : Promise<any> {
    return this.storage.clear();
  }  
}
