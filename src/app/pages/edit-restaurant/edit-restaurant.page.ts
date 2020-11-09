import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import { AuthService } from 'src/app/services/auth.service';


import { RestaurantService } from '../../services/restaurant.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.page.html',
  styleUrls: ['./edit-restaurant.page.scss'],
})
export class EditRestaurantPage implements OnInit {

  editRestaurantForm: FormGroup
  spin: boolean
  ownerId: any;
  id: any;
  restaurants: any = [];

  selectedFile: File = null;
  upLoadedFile: any;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log('ID: ', this.id)

    // fetching single restaurant by it's id and set the values
    firebase.firestore().collection('restaurants').doc(this.id).get().then(snapshot => {
      this.restaurants = snapshot.data();
      console.log('New Document Data: ', this.restaurants)
      this.editRestaurantForm.controls['resName'].setValue(this.restaurants.resName),
      this.editRestaurantForm.controls['phone'].setValue(this.restaurants.phone),
      this.editRestaurantForm.controls['email'].setValue(this.restaurants.email),
      this.editRestaurantForm.controls['website'].setValue(this.restaurants.website),
      this.editRestaurantForm.controls['imgUrl'].setValue(this.restaurants.imgUrl),
      this.editRestaurantForm.controls['address'].setValue(this.restaurants.address)
    });

    this.editRestaurant()
  }

  editRestaurant() {
    this.editRestaurantForm = this.fb.group({
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
      this.editRestaurantForm.get('imgUrl').setValue(this.upLoadedFile);
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
    return <FormArray>this.editRestaurantForm.get('address');
  }

  // Method for updating the restaurant
  async editRes() {

    const alert = await this.alertCtrl.create({

      message: `Your restaurant is updated successfully, please click Okay to confirm.`,
      buttons: [
        {
          text: 'Okay',
          handler: () => {

            var user = firebase.auth().currentUser
            this.ownerId = user.uid;

            firebase.firestore().collection('restaurants').doc(this.ownerId).update({
              // onwerId: this.ownerId,
              resName: this.editRestaurantForm.value.resName,
              phone: this.editRestaurantForm.value.phone,
              email: this.editRestaurantForm.value.email,
              website: this.editRestaurantForm.value.website,
              imgUrl: this.editRestaurantForm.value.imgUrl,
              address: this.editRestaurantForm.value.address
            }).then(() => {
              this.nav.navigateRoot('/profile')
              this.editRestaurantForm.reset();
            }).catch(function(error){
              console.log(error);
            });
          }
        }
      ]
    });
    return await alert.present();

    

    // firebase.firestore().collection('restaurants').doc(this.ownerId).update({
    //   // onwerId: this.ownerId,
    //   resName: this.editRestaurantForm.value.resName,
    //   phone: this.editRestaurantForm.value.phone,
    //   email: this.editRestaurantForm.value.email,
    //   website: this.editRestaurantForm.value.website,
    //   imgUrl: this.editRestaurantForm.value.imgUrl,
    //   address: this.editRestaurantForm.value.address
    // }).then(function(docRef){
    //   console.log("Document Updated: ", docRef);
    // }).catch(function(error){
    //   console.log("Error: ", error);
    // });
    // this.nav.navigateRoot('/profile')
    // this.editRestaurantForm.reset();
  }

}
