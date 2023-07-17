import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { catchError, tap, throwError } from 'rxjs';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(
    private http :HttpClient,
    private _profileService : ProfileService,
    private _router : Router
  ) { }

  refreshToken(){
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http.post('http://172.17.12.160:1999/refresh', {refreshToken})
      .pipe(
        tap((res)=> {
          this.setSession(res);
        }),
        catchError((error : any) => {
          if(error.status === 401 || error.status === 500){
            console.log('got an error ', error.status);
            this.logout(); // clearing user session.
            this._router.navigate(['/home']);
          }
          return throwError(error);
        })
      )

  }

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

  logout(){
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToke');
    this._profileService.setLogged(false);
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
