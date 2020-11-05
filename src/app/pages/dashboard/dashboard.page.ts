import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  constructor(private authService: AuthService) { 
    // console.log(this.authService.getSession())
  }

  ngOnInit() {
    this.authService.signAuth();
  }

}
