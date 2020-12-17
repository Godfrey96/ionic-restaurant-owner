import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dash-profile',
  templateUrl: './dash-profile.page.html',
  styleUrls: ['./dash-profile.page.scss'],
})
export class DashProfilePage implements OnInit {

  constructor(
              private authService: AuthService,
              private nav: NavController
            ) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logoutOwner();
    this.authService.signAuth();
    this.nav.navigateRoot('/signin')
  }

}
