import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  loginForm: FormGroup;
  spin: boolean = false;

  constructor(
              public nav: NavController,
              private fb: FormBuilder,
              private authService: AuthService,
              private alertCtrl: AlertController
            ) { }

  ngOnInit() {
    this.loginOwner();
  }
  loginOwner(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async login_Owner(){
    // console.log(this.loginForm.value);
    this.authService.signinOwner(this.loginForm.value.email, this.loginForm.value.password).then((res) => {
      console.log(res.user);
      this.nav.navigateRoot('/dashboard');
    },
    async error => {
      const alert = await this.alertCtrl.create({
        message: error.message,
        buttons: [{ text: 'Ok', role: 'cancel' }],
      });
      await alert.present();
    }
    );
  }

}
