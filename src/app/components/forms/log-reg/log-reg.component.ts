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
    });
  }

  onLogClick() {
    this.signup = false;
    this.login = true;
    this.form = new FormGroup({
      emailORphone: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  // to close form
  close() {
    this.profileService.setFormClick(false);
  }

  submit() {
    console.log("button cliked");
    if (this.form.valid) {
      console.log('Form Values are : ', this.form.value);

      if (this.login) {
        const user = {
          emailORphone : this.form.get('emailORphone')!.value,
          password : this.form.get('password')!.value
        }
        // testing login data
        console.log('login form data : ', user);

        this.authService.login(user).subscribe(
          (res) => {
            console.log('HTTP Request Sucessfull ', res);
            this.profileService.setFormClick(false);
            this.profileService.setLogged(true);
          },(error) => {
            console.log('HTTP Response Error : ', error);
          }
        );
      } else {
        const user = {
          userName: this.form.get('userName')!.value,
          email: this.form.get('email')!.value,
          phone : this.form.get('phone')!.value,
          password: this.form.get('password')!.value,
        };
        // testing sign up data
        console.log('SignUP form data', user);

        this.authService.signUp(user).subscribe(
          (res) => {
            console.log('HTTP request sucessfull', res);
            this.profileService.setProfileClick(false);
          },
          (error) => {
            console.log('Http response error', error);
          }
        );
      }
    }else{
      console.log('invalid form data');
      console.log(this.form.value);
    }
  }
}
