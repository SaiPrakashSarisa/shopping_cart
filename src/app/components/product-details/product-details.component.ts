import { Component, ChangeDetectorRef } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent {

  product_data? : any;
  addedToCart : boolean = false;
  profileOpened : boolean = false;
  formOpened : boolean = false;
  

  constructor(
   private _activatedRoute : ActivatedRoute,
   private _productService : ProductsService,
   private _profileService : ProfileService,
   private _cd : ChangeDetectorRef,
   private _router : Router
  
  ) {}

  sub? : any;

  ngOnInit() :void{
    this.sub = this._activatedRoute.paramMap.subscribe((params) => {
      console.log(params.get('id'), 'is the parameter passed to the url');
      const id = params.get('id');
      this._productService.getSelected((<string>id)).subscribe( async (res)=> {
        console.log("got response");
        this.product_data = await res;
        console.log(this.product_data);
      })
    });

    this._profileService.getProfileClickStatus().subscribe((value) => {
      this.profileOpened = value;
    });

    this._profileService.getFormClickStatus().subscribe((value) => {
      this.formOpened = value;
    })
  }

  getLoggedStatus() : boolean{
    return this._profileService.getLogged();
  }

  addToCart(id : string){
    if(this.getLoggedStatus()){
      this._productService.addToCart(id).subscribe((response) => {
        console.log(response);

        if(response){
          this.addedToCart = true;
          setTimeout(()=> {
            this.addedToCart= false;
            this._cd.detectChanges();
          }, 500);
        }
      })
    }else{
      console.log(`user haven't logged in`);
      this._profileService.setFormClick(true);
      this._cd.detectChanges();
    }
  }

  addAndRedirectToCart(id : string){
    if(this.getLoggedStatus()){
      this._productService.addToCart(id).subscribe((response) => {
        console.log(response);

        if(response){
          // this.addedToCart = true;
          // setTimeout(()=> {
          //   this.addedToCart= false;
          //   this._cd.detectChanges();
          // }, 500);

          this._router.navigate(['/cart']);
        }
      })
    }else{
      console.log(`user haven't logged in`);
      this._profileService.setFormClick(true);
      this._cd.detectChanges();
    }
  }
}
