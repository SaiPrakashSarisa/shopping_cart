import { Component, EventEmitter, Output } from '@angular/core';
import { Form, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent {

  @Output()
  formSubmitted = new EventEmitter<any>();

  constructor(private _authService: AuthServiceService) {}

  ngOnInit() {}

  addressForm = new FormGroup({
    houseNumber: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    state : new FormControl('', Validators.required),
    country : new FormControl('', Validators.required),
    postalcode : new FormControl('', Validators.required),
  });

  submit():void {
    console.log("inside form submit method");
    if(this.addressForm.valid){
      console.log(this.addressForm.value);
      let address = {
        houseNo : this.addressForm.get('houseNumber')!.value,
        street : this.addressForm.get('street')!.value,
        city : this.addressForm.get('city')!.value,
        state : this.addressForm.get('state')!.value,
        country : this.addressForm.get('country')!.value,
        postalcode : this.addressForm.get('postalcode')!.value
      }

      this._authService.addAddress(address).subscribe((res)=> {
        console.log(res);
        this.formSubmitted.emit();
      });
    }else{
      console.log('invalid form data');
    }
  }
}
