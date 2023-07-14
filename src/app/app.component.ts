import { Component } from '@angular/core';
import { ProfileService } from './components/services/profile.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'RoadSterShoppingCart';

  profileOpened?: boolean;
  formOpened?: boolean;
  showNavbar : boolean = true;

  constructor(
    private _profileService: ProfileService,
    private _router : Router,
    private _route : ActivatedRoute,
  ){
    this._router.events.subscribe( event => {
      if(event instanceof NavigationEnd){
        const url = event.url;
        const queryParams = this._route.snapshot.queryParams;
        this.showNavbar = !['/cart', '/checkout', '/product'].includes(url);
      }
    })
  }

  getLogged():boolean {
    return this._profileService.getLogged();
  }

  ngOnInit(){
    
    const refreshtoke = localStorage.getItem('accessToke');
    if(refreshtoke){
      this._profileService.setLogged(true);
      
    }


    this._profileService.getProfileClickStatus().subscribe((value) => {
      this.profileOpened = value;
    });

    this._profileService.getFormClickStatus().subscribe((value) => {
      this.formOpened = value;
    });
  }
}
