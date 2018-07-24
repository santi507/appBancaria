import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { MapPage } from '../map/map';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage { 

  tab1Root = HomePage;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController) {

  }

  getMap() {
    //Obtener la ubicación actual del dispositivo
    this.navCtrl.push(MapPage);
    
  }


}