import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profiledata',
  templateUrl: './profiledata.component.html',
  styleUrls: ['./profiledata.component.scss']
})
export class ProfiledataComponent {

  userData  :any = [] ;
  addresses : any[]= [];
  
  editUser : boolean = false;
  editaddress : boolean[] =[];
  constructor(
    private _authService : AuthServiceService,
    private _cd : ChangeDetectorRef
  ) {}
  
  ngOnInit(){

    console.log('insde profile data ')
    this._authService.getCustomerData().subscribe((res)=> {
      this.userData = (<any>res);
      console.log('user data ', this.userData);
    });
    this._authService.getAddresses().subscribe((res)=> {
      let address = (<any>res);
      this.addresses = address.addresses;
      console.log('user addresses ', this.addresses);
      this.addresses.map((address)=> {
        this.editaddress.push(false);
      })
    });
  }

  userForm = new FormGroup({
    custName : new FormControl('', Validators.required),
    phone : new FormControl('', Validators.required ),
    email : new FormControl('', Validators.required)
  });

  addressForm = new FormGroup({
    house_number : new FormControl('', Validators.required),
    street : new FormControl('', Validators.required),
    city : new FormControl('', Validators.required),
    state : new FormControl('', Validators.required),
    country : new FormControl('', Validators.required),
    postal_code : new FormControl('', Validators.required)
  })

  edit(){
    this.editUser = true;
  }

  editAddress(i:any){
    console.log(i, 'is the index');
    this.editaddress[i] = true;
  }

  deleteAddress(address_id: number){
    this._authService.deleteAddress(address_id).subscribe((res)=>{
      console.log(res);
      this.ngOnInit();
      this._cd.detectChanges();
    });
  }

  save(){
    if(this.editUser){
      console.log(this.userForm.value);
      if(this.userForm.valid){
        console.log('formis valid');
        let customer = {
          custName : this.userForm.get('custName')!.value,
          email : this.userForm.get('email')!.value,
          phone : this.userForm.get('phone')!.value
        }

        this._authService.updateCustomer(customer).subscribe((res) => {
          console.log(res);
          this.editUser = false;
          this.ngOnInit();
          this._cd.detectChanges();
        })
      }else{
        console.log('form is invalid');
      }
    }
  }

  saveAddress(i: number, id : string){
    console.log(this.addressForm.value);
    if(this.addressForm.valid){
      let address = {
        address_Id : id,
        house_number : this.addressForm.get('house_number')!.value,
        street : this.addressForm.get('street')!.value,
        city : this.addressForm.get('city')!.value,
        state : this.addressForm.get('state')!.value,
        country :  this.addressForm.get('country')!.value,
        postal_code : this.addressForm.get('postal_code')!.value
      }

      // console.log(address, " is the address object created") ;
      this._authService.updateAddresss(address).subscribe((result)=> {
        console.log(result)
        this.editaddress[i]=false;
        this.ngOnInit();
        this._cd.detectChanges();
      })

      
    }
    
  }

  
}
