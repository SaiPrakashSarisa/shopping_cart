import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getAllProducts(){
    return this.http.get('http://172.17.12.160:1999/allProducts');
  }

  getSelected(id : string){
    return this.http.post('http://172.17.12.160:1999/product', {id});
  }

  // add to cart
  addToCart(id : string){
    return this.http.post('http://172.17.12.160:1999/addToCart', {id});
  }

  // get cart items
  getCartItems(){
    return this.http.get('http://172.17.12.160:1999/getCartItems');
  }

  // delete cart items
  deletCartItems(product_id : string, cart_item_id : string, qty : number){
    return this.http.post('http://172.17.12.160:1999/deleteCartItem', {product_id, cart_item_id, qty});
  }
}
