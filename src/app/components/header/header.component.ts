import { Component } from '@angular/core';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  
  constructor(private profileService : ProfileService) {}


  getLogged():boolean{
    return this.profileService.getLogged();
  }

  openform(){
    console.log("form is clicked");
    this.profileService.setFormClick(true);
  }

  openProfile(){
    this.profileClick();
  }

  profileClick(){
    console.log("profile is clicked");
    this.profileService.setProfileClick(true);
  }

  
}
