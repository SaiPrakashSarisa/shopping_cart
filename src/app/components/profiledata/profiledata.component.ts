import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profiledata',
  templateUrl: './profiledata.component.html',
  styleUrls: ['./profiledata.component.scss']
})
export class ProfiledataComponent {

  userData : any[]= [] ;
  addresses : []= [];
  
  editUser : boolean = false;

  constructor(private _authService : AuthServiceService) {}
  
  ngOnInit(){

    console.log('insde profile data ')
    this._authService.getCustomerData().subscribe((res)=> {
      this.userData.push(res);
      console.log('user data ', this.userData);
    })
    this._authService.getAddresses().subscribe((res)=> {
      let address = (<any>res);
      this.addresses = address.addresses;
      console.log('user addresses ', this.addresses);
    })
  }

  userForm = new FormGroup({
    custName : new FormControl('', Validators.required),
    phone : new FormControl('', Validators.required ),
    email : new FormControl('', Validators.required)
  });

  edit(){
    this.editUser = true;
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

        this._authService.updateCustomer(customer);
      }else{
        console.log('form is invalid');
      }
    }
  }

  
}
