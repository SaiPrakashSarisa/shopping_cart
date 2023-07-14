import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ProfileService } from './components/services/profile.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _profileService: ProfileService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const jwtToken = localStorage.getItem('accessToke');

    if(request.url.includes('/profile') || request.url.includes('/addToCart') || request.url.includes('/getCartItems') 
    || request.url.includes('/addaddress') || request.url.includes('/addresses') || request.url.includes('/deleteaddress')
    || request.url.includes('/placeorder') && jwtToken){
      const copyToken = request.clone({
        headers : request.headers.set('Authorization', 'Bearer '+jwtToken)
      });
      return next.handle(copyToken).pipe(
        catchError(error => {
          if(error.status === 401 || error.status === 500){
            console.log('got an error', error);
            localStorage.removeItem('accessToke');
            localStorage.removeItem('refreshToken');
            this._profileService.setLogged(false);
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
