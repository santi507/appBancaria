import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { LocationPage } from '../location/location';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController) {

  }

  locations(): void {
    let modal = this.navCtrl.push(LocationPage);
    // modal.present();
  }

}
