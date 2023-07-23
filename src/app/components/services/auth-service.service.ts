import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { ProfileService } from './profile.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(
    private http: HttpClient,
    private _profileService: ProfileService,
    private _router: Router
  ) {}

  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http
      .post('http://localhost:1999/refresh', { refreshToken })
      .pipe(
        tap((res) => {
          this.setSession(res);
        }),
        catchError((error: any) => {
          if (error.status === 401 || error.status === 500) {
            console.log('got an error ', error.status);
            this.logout(); // clearing user session.
            this._router.navigate(['/home']);
          }
          return throwError(error);
        })
      );
  }

  signUp(user: any) {
    console.log('inside auth service');
    return this.http.post('http://localhost:1999/signUp', user);
  }

  /**
   * Sends a POST request to the backend API endpoint to log in the user.
   * @param user An object containing the user's login credentials.
   * @returns An Observable that emits the response from the API endpoint.
   * The session is set on successful login.
   */
  login(user: any) {
    return this.http.post('http://localhost:1999/login', user).pipe(
      tap((res) => {
        this.setSession(res);
      })
    );
  }

  /**
   *
   * @param {Object} response This method taken an object as parameter with accessToken and refreshToken as properties.
   * And it stores the tokens in the browsers local storage.
   */
  private setSession(response: any) {
    localStorage.setItem('accessToke', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  logout() {
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToke');
    this._profileService.setLogged(false);
  }

  addAddress(address: any) {
    // console.log('inside add address service');
    return this.http.post('http://localhost:1999/addaddress', address);
  }

  getCustomerData() {
    return this.http.get('http://localhost:1999/customer');
  }

  updateCustomer(customer: any) {
    return this.http.post('http://localhost:1999/updateCustomer', {
      customer,
    });
  }

  getAddresses() {
    return this.http.get('http://localhost:1999/addresses');
  }

  deleteAddress(address_id: number) {
    return this.http.post('http://localhost:1999/deleteaddress', {
      address_id,
    });
  }

  updateAddresss(address: any) {
    return this.http.post('http://localhost:1999/updateAddress', {
      address,
    });
  }

  order(products: any) {
    return this.http.post('http://localhost:1999/placeorder', { products });
  }
}
