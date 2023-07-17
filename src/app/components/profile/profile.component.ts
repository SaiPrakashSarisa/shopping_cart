import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(
    private _router : Router,
    private _activatedRuote : ActivatedRoute,
    private _cd : ChangeDetectorRef
  ) {}

  profile(){
    this._router.navigate(['profiledata'], {relativeTo : this._activatedRuote});
  }

  orders(){
    this._router.navigate(['orders'], {relativeTo : this._activatedRuote});
  }

  logout(){
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToke');
    this._router.navigate(['/home']);
  }
}
