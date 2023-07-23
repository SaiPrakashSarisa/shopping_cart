import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';
import { AuthServiceService } from '../../services/auth-service.service';

@Component({
  selector: 'app-log-reg',
  templateUrl: './log-reg.component.html',
  styleUrls: ['./log-reg.component.scss'],
})
export class LogRegComponent {
  login: boolean = true;
  signup: boolean = false;
  statusMessage: boolean = false;
  sucess: boolean = false;
  failed: boolean = false;
  duplicate: boolean = false;
  message: string = '';

  form!: FormGroup;

  constructor(
    private profileService: ProfileService,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    console.log(this.login, 'login');
    console.log(this.signup, 'signup');

    this.form = new FormGroup({
      emailORphone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      retailer: new FormControl(false, [Validators.required]),
    });
  }

  onSignUp() {
    this.login = false;
    this.signup = true;
    this.form = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      retailer: new FormControl(false, [Validators.required]),
    });
  }

  onLogClick() {
    this.signup = false;
    this.login = true;
    this.form = new FormGroup({
      emailORphone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      retailer: new FormControl(false, [Validators.required]),
    });
  }

  // to close form
  close() {
    this.profileService.setFormClick(false);
  }

  submit() {
    console.log('Form Submitted');
    if (this.form.valid) {
      console.log('The Form is valid');
      console.log('Form Values are : ', this.form.value);

      if (this.login) {
        const user = {
          emailORphone: this.form.get('emailORphone')!.value,
          password: this.form.get('password')!.value,
          retailer: this.form.get('retailer')!.value,
        };
        // testing login data
        console.log('login form data : ', user);

        this.authService.login(user).subscribe(
          (res) => {
            if ((<any>res).retailer) {
              console.log('logged user is retailer');
            } else {
              console.log('logged use is consumer');
            }
            console.log('HTTP Request Sucessfull ', res);
            this.profileService.setFormClick(false);
            this.profileService.setLogged(true);
          },
          (error) => {
            console.log('HTTP Response Error : ', error);
            this.message = error.error.message;
            this.statusMessage = true;
            this.duplicate = true;
            setTimeout(() => {
              this.duplicate = false;
              this.statusMessage = false;
            }, 1200);
          }
        );
      } else {
        const user = {
          userName: this.form.get('userName')!.value,
          email: this.form.get('email')!.value,
          phone: this.form.get('phone')!.value,
          password: this.form.get('password')!.value,
          retailer: this.form.get('retailer')!.value,
        };
        // testing sign up data
        console.log('SignUP form data as object', user);

        this.authService.signUp(user).subscribe(
          (res) => {
            console.log('HTTP request sucessfull', res);
            this.statusMessage = true;
            this.sucess = true;
            // set time out function to remove the message after 1.5 seconds
            setTimeout(() => {
              this.sucess = false;
              this.statusMessage = false;
            }, 1500);
            this.profileService.setProfileClick(false);
          },
          (error) => {
            console.log('Http response error', error);
            console.log(error.error.message);
            // setting error vlaue to the message variable
            this.message = error.error.message;
            // setting boolean value to show messge to user
            this.statusMessage = true;
            this.duplicate = true;
            // set time out function to remove the message after 1.5 seconds
            setTimeout(() => {
              this.duplicate = false;
              this.statusMessage = false;
            }, 1500);
          }
        );
      }
    } else {
      console.log('invalid form data');
      console.log(this.form.value);
    }
  }
}
