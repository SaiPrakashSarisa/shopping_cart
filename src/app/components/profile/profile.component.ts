import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  user : any = [];

  constructor(
    private _router : Router,
    private _activatedRuote : ActivatedRoute,
  ) {}

  ngOnIntit(){
   
  }

  profile(){
    this._router.navigate(['profiledata'], {relativeTo : this._activatedRuote});
  }

  orders(){
    this._router.navigate(['orders'], {relativeTo : this._activatedRuote});
  }

  close(){
    this._router.navigate(['/home']);
  }

  logout(){
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToke');
    this.close();
  }
}
