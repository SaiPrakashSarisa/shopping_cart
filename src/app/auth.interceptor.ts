import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ProfileService } from './components/services/profile.service';
import { AuthServiceService } from './components/services/auth-service.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private _profileService: ProfileService,
    private _authService : AuthServiceService
    ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const jwtToken = localStorage.getItem('accessToke');

    if(request.url.includes('/profile') || request.url.includes('/addToCart') || request.url.includes('/customer')
    ||request.url.includes('/updateCustomer') || request.url.includes('/getCartItems') || request.url.includes('/deleteCartItem')  
    || request.url.includes('/addaddress') || request.url.includes('/addresses') || request.url.includes('/deleteaddress')
    || request .url.includes('/updateAddress')|| request.url.includes('/placeorder') && jwtToken){
      const copyToken = request.clone({
        headers : request.headers.set('Authorization', 'Bearer '+jwtToken)
      });
      return next.handle(copyToken).pipe(
        catchError(error => {
          if(error.status === 401 || error.status === 500){
            console.log('got an error', error.status);
            this._authService.refreshToken().subscribe(resp => {
              console.log("Response form refresh token ", resp);
            }, error => {
              console.log("Refresh token error ", error);
            });
            // localStorage.removeItem('accessToke');
            // localStorage.removeItem('refreshToken');
          }
          return throwError(error);
        })
      )
    }
    else{
      return next.handle(request);
    }
    
  }
}
