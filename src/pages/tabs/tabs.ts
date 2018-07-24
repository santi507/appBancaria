import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { MapPage } from '../map/map';
import { LocationService, MyLocation } from '@ionic-native/google-maps';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  public deviceLocation: any;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController) {

  }

  getMap() {
    //Obtener la ubicación actual del dispositivo
    LocationService.getMyLocation().then( (myLocation: MyLocation) => {
      this.deviceLocation = myLocation.latLng
      //Enviar posición del dispositivo a la página del mapa
      this.navCtrl.push(MapPage, {
        deviceLocation: this.deviceLocation,
        error: false
      });
    }).catch( () => {
      //Pantalla de error al no obtener la ubicación del dispositivo
      this.navCtrl.push(MapPage, {
        deviceLocation: '',
        error: true
      });
    });
    
  }


}