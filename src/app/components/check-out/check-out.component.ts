import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {

  form : boolean = false;
  addresses : any[] = [];
  quantity : number = 0;
  totalPrice : number = 0;
  products : [] = [];
  orderSucess : boolean = false;

  constructor(
    private _authService : AuthServiceService, 
    private _cd : ChangeDetectorRef,
    private _route : ActivatedRoute,
    private _router : Router
  ) {}

  ngOnInit(){

    this._route.queryParams.subscribe( params => {
      this.quantity = params['quantity'];
      this.totalPrice = params['totalPrice'];
      this.products = JSON.parse(params['products']);
    })

    // console.log(this.products, " form the check out");

    this._authService.getAddresses().subscribe(async (res) => {
      console.log(res);
      const addresses = (<any>res);
      this.form = false;
      this.addresses = await addresses.addresses;
      this._cd.detectChanges();
    });
  }

  addressForm(){
    this.form= true;
  }

  closeForm(){
    this.form= false;
    this.ngOnInit();
    this._cd.detectChanges();
  }

  deleteAddress(address_id : number){
    this._authService.deleteAddress(address_id)
     .subscribe((res)=> {
      console.log(res);
      this.ngOnInit();
      this._cd.detectChanges();
    });
  }

  buyItem(){
    this._authService.order(this.products).subscribe(async (res) => {
      console.log(res);
      this.orderSucess = true;
      setTimeout(()=> {
        this.orderSucess = false;
        this._router.navigate(['/home']);
      }, 1000)
    });
  }
}
