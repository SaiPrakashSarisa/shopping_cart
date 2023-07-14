import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private isLoggedIn = false;
  private formClicked = new Subject<boolean>();
  private profileClicked = new Subject<boolean>();

  constructor() { }

  setLogged(value: boolean) {
    this.isLoggedIn = value;
  }

  getLogged(): boolean {
    return this.isLoggedIn;
  }

  public setProfileClick(value : boolean){
    this.profileClicked.next(value);
  }

  public getProfileClickStatus(){
    return this.profileClicked.asObservable();
  }

  public setFormClick(value : boolean){
    this.formClicked.next(value);
  }

  public getFormClickStatus(){
    return this.formClicked.asObservable();
  }


}
