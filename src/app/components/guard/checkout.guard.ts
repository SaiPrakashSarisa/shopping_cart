import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CheckoutService } from '../services/checkout.service';

@Injectable()
export class checkoutGuard implements CanActivate {

  

 

  ngOnInit(){
   
  }
  canActivate(): boolean {

    
    return true;
    

    
  } 


  
};
