import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private itemSelected = new Subject<boolean>();

  constructor() { }

  public setItemSelected(value : boolean){
    console.log("set item");
    this.itemSelected.next(value);
  }

  public getItemSelected(){
    return this.itemSelected.asObservable();
  }

}
