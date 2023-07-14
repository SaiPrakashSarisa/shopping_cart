import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';

import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  
  products! : any;

  profileOpened?: boolean;
  formOpened?: boolean;

  constructor(
    private profileService: ProfileService,
    private prodcutsService : ProductsService,
  ) {}

  getLogged():boolean {
    return this.profileService.getLogged();
  }

  ngOnInit() {

    this.prodcutsService.getAllProducts().subscribe(async(res : any)=>{
      this.products = await res;
      // console.log(this.products);
    })

    this.profileService.getProfileClickStatus().subscribe((value) => {
      this.profileOpened = value;
    });

    this.profileService.getFormClickStatus().subscribe((value) => {
      this.formOpened = value;
    })
  }
}
