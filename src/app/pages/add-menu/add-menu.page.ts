import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AlertController, NavController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

import firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.page.html',
  styleUrls: ['./add-menu.page.scss'],
})
export class AddMenuPage implements OnInit {

  addMenuForm: FormGroup;

  spin: boolean = false;
  ownerId: any;

  restId: any;
  restaurantLists: Array<any> = [];

  selectedFile: File = null;
  upLoadedFile: any;
  menuId: any;

  constructor(
    public nav: NavController,
    public loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private authService: AuthService,
    private restaurantService: RestaurantService,
    private alertCtrl: AlertController
  ) {
    // this.authService.getSession();
  }

  ngOnInit() {

    var user = firebase.auth().currentUser
    this.ownerId = user.uid;
    console.log('owner Idd - ngonit: ', this.ownerId)

    this.addDish();
  }

  addDish() {
    this.addMenuForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      // website: ['', Validators.required],
      imgUrl: ['', Validators.required],
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
      this.addMenuForm.get('imgUrl').setValue(this.upLoadedFile);
      //console.log(this.upLoadedFile);
    };
  }

  async addMenu() {

    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {

        const loading = await this.loadingCtrl.create();

        // var user = firebase.auth().currentUser
        // this.ownerId = user.uid;
        // console.log('owner Idd: ', this.ownerId)


        //fetching all restaurants
        firebase.firestore().collection('restaurants').where('ownerId', '==', user.uid).onSnapshot(res => {
          res.forEach(async element => {
            this.restaurantLists.push(Object.assign(element.data(), { uid: element.id }));
            this.restId = { uid: element.id }.uid
            console.log('rest id: ', this.restId)

            // Adding new menu
            firebase.firestore().collection('restaurants').doc(this.restId).collection('menu').add({
              ownerId: user.uid,
              restId: this.restId,
              name: this.addMenuForm.value.name,
              price: this.addMenuForm.value.price,
              description: this.addMenuForm.value.description,
              imgUrl: this.addMenuForm.value.imgUrl,
              createdAt: firebase.firestore.FieldValue.serverTimestamp()
            }).then((doc) => {
              doc.set({ menuId: doc.id }, { merge: true }).then(() => {
                console.log('MENU_ID: ', this.menuId)
              })
            })
              .then(() => {
                loading.dismiss().then(() => {
                  this.nav.navigateRoot('/menu')
                  this.addMenuForm.reset();
                });
              },
                error => {
                  loading.dismiss().then(() => {
                    console.log(error);
                  });
                }
              );
            return await loading.present();

          });
        });

      }
    })

  }

}
