import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { tap } from 'rxjs';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http :HttpClient, private profileService : ProfileService) { }

  signUp(user : any){
    console.log('inside auth service' );
    return this.http.post('http://172.17.12.160:1999/signUp', user);
  };

  login(user : any){
    console.log('inside login of authService');
    return this.http.post('http://172.17.12.160:1999/login', user)
    .pipe(
      tap((res) => {
        this.setSession(res);
      })
    )
  };

  private setSession(response : any){
    // console.log(response);
    localStorage.setItem('accessToke', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  addAddress(address : any){
    // console.log('inside add address service');
    return this.http.post('http://172.17.12.160:1999/addaddress', address);
  }

  getAddresses() {
    return this.http.get('http://172.17.12.160:1999/addresses');
  }

  deleteAddress(address_id : number) {
    return this.http.post('http://172.17.12.160:1999/deleteaddress', {address_id})
  }

  order(products : any){
    return this.http.post('http://172.17.12.160:1999/placeorder', {products});
  }

}
