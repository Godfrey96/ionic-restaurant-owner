import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import { AuthService } from 'src/app/services/auth.service';


import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.page.html',
  styleUrls: ['./add-restaurant.page.scss'],
})
export class AddRestaurantPage implements OnInit {

  addRestaurantForm: FormGroup;
  spin: boolean = false;

  ownerId: any;

  selectedFile: File = null;
  upLoadedFile: any;

  constructor(
    public nav: NavController,
    private fb: FormBuilder,
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private alertCtrl: AlertController
  ) { 
    // this.authService.getSession();
  }

  ngOnInit() {
    if(this.authService.signAuth()){
      this.addRestaurant();
    }else{
      console.log('error')
    }
    
  }

  addRestaurant() {
    this.addRestaurantForm = this.fb.group({
      resName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      website: ['', Validators.required],
      imgUrl: ['', Validators.required],
      address: this.fb.array([this.addAddressGroup()]),
    });
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadstart = (p) => {
      console.log(p);
    };
    reader.onloadend = (e) => {
      console.log(e.target);
      this.upLoadedFile = reader.result;
      this.addRestaurantForm.get('imgUrl').setValue(this.upLoadedFile);
      //console.log(this.upLoadedFile);
    };
  }

  addAddressGroup() {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      province: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]]
    });
  }

  addAddress() {
    this.addressArray.push(this.addAddressGroup());
  }

  removeAddress(index) {
    this.addressArray.removeAt(index);
  }

  get addressArray() {
    return <FormArray>this.addRestaurantForm.get('address');
  }

  addRes() {
    console.log(this.addRestaurantForm.value);
    var user = firebase.auth().currentUser

    this.ownerId = user.uid;

    this.restaurantService.registerRestaurant().doc(this.ownerId).set({
      ownerId: this.ownerId,
      resName: this.addRestaurantForm.value.resName,
      phone: this.addRestaurantForm.value.phone,
      email: this.addRestaurantForm.value.email,
      website: this.addRestaurantForm.value.website,
      imgUrl: this.addRestaurantForm.value.imgUrl,
      address: this.addRestaurantForm.value.address
    }).then(function(docRef){
      //console.log("Document written with ID: ", docRef.id);
    }).catch(function(error){
      console.log(error);
    });
    this.nav.navigateRoot('/profile')
    this.addRestaurantForm.reset();

    // this.restaurantService.registerRestaurant().doc(user.uid).add({
    //   resName: this.addRestaurantForm.value.resName,
    //   phone: this.addRestaurantForm.value.phone,
    //   email: this.addRestaurantForm.value.email,
    //   website: this.addRestaurantForm.value.website,
    //   imgUrl: this.addRestaurantForm.value.imgUrl,
    //   address: this.addRestaurantForm.value.address
    // }).then((res) => {
    //   console.log('data: ' +res);
    // });

    // firebase.database().ref('restaurants/' + user.uid).push().set({
    //   resName: this.addRestaurantForm.value.resName,
    //   phone: this.addRestaurantForm.value.phone,
    //   email: this.addRestaurantForm.value.email,
    //   website: this.addRestaurantForm.value.website,
    //   address: this.addRestaurantForm.value.address
      
    // }).then((res) => {
    //   console.log('data: ' + res);
    // });
  }

}
