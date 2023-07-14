import { Component, ChangeDetectorRef } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { CheckoutService } from '../services/checkout.service';


interface Checkbox {
  label: string;
  value: boolean;
}

interface products {
  cart_item_id :number,
  product_id : string,
  quantity : number,
  product_price: number,
  product_name : string,
  product_discount : number,
  imgp_id : string, 
  image_file :{
    type : string,
    data : []
  },
  image : {
    id : string,
    image : string
  }
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  products : any[] = [];
  form! : FormGroup ;
  totalPrice : number = 0;
  subTotal : number = 0;
  itemsSelected : number = 0;
  selectedItems : any[] = [];
  loggedStatus : boolean = false;

  purchaseDisabled : boolean = true;
  

  constructor(
    private _productsService: ProductsService,
    private _cd : ChangeDetectorRef,
    private _formBuilder : FormBuilder,
    private _router : Router,
    private _profileService : ProfileService,
    private _checkOutService : CheckoutService
    ) {}

  ngOnInit() {

    this.loggedStatus = this._profileService.getLogged();
    

    if(this.loggedStatus){
       this._productsService.getCartItems().subscribe( (res) => {
      console.log(res);
      this.products = (<any>res);
      this.totalPrice =0;
      this.products.map((item :any) => {
        this.totalPrice += ((item.product_price - ((item.product_price)*(item.product_discount/100))) * item.cart_item_quantity);
      })

      this.form = this._formBuilder.group({});
      if(this.products){
        this.products.forEach((item : any) => {
        this.form.addControl(item.product_id, new FormControl(false));
      });
      }
    });
    }
   
  }

  //submit form
  submitForm(){
    this.purchaseDisabled = false;
    if(this.form.valid){
      this.selectedItems = Object.keys(this.form.value)
        .filter(key => this.form.value[key])
        .map(key => this.products.find((item : any)=> item.product_id.toString() === key ));

      console.log(this.selectedItems, ' selected items');

      this.itemsSelected= 0;
      this.subTotal = 0;
      this.selectedItems.map((item) => {
        this.subTotal += ((item.product_price - ((item.product_price)*(item.product_discount/100))) * item.cart_item_quantity);
        this.itemsSelected += item.cart_item_quantity;
      })
    }
  }

  purchase(){
    const OrderedProducts = this.products.map((product : any)=>{
      return {
        product_id : product.product_id, 
        cart_item_id : product.cart_item_id, 
        cart_item_quantity :product.cart_item_quantity,
        product_quantity : product.product_quantity
      }
    });
    const queryParams = {products : JSON.stringify(OrderedProducts), totalPrice: this.subTotal, quantity: this.itemsSelected};
    this._router.navigate(['/checkout'], {queryParams});
  }

  // delete cart item 
  delete(product_id : string, cart_item_id : string, qty : number){
    console.log(product_id, cart_item_id, qty );
    this._productsService.deletCartItems(product_id, cart_item_id, qty).subscribe(async (res) => {
      console.log(res);
      if(res){
        this.ngOnInit();
        this._cd.detectChanges();
      }
    });
  }
}
