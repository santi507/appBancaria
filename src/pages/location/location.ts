import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { Diagnostic } from '@ionic-native/diagnostic';
import { GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent } from '@ionic-native/google-maps';

import { LocationProvider } from '../../providers/location/location';

@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  locations = [];
  @ViewChild('map') mapElement: ElementRef;
  private map: GoogleMap;
  private location: LatLng;

  constructor(public navCtrl: NavController, public loading: LoadingController, private diagnostic: Diagnostic, public platform: Platform, private googleMaps: GoogleMaps, public locationsProvider: LocationProvider) {
    this.locations = locationsProvider.getLocations();
    this.location = new LatLng(8.983333, -79.516670);
  }

  ionViewDidLoad() {
    this.checkLocation();
  }

  showMap() {

    let loader = this.loading.create({
      spinner: 'ios',
      content: 'Cargando ubicaciones...'
    });

    loader.present().then( () => {
      let element = this.mapElement.nativeElement;
      this.map = this.googleMaps.create(element);

      this.map.one(GoogleMapsEvent.MAP_READY).then( () => {
        let options = {
          target: this.location,
          zoom: 10
        };

        this.map.moveCamera(options);
        
        this.map.addMarker({
          icon: 'red',
          position: this.location
        });

        this.locations.forEach(location => {
          this.map.addMarker({
            icon: 'blue',
            position: location.coordinates,
          })
        });


      });

      loader.dismiss();
    });

  }

  checkLocation(){
    this.platform.ready().then(() => {
      this.diagnostic.isLocationEnabled().then( (enabled) => {
        this.showMap();
      }).catch( (e) => {
        alert('Debes activar la geolocalización en las configuraciones de tu celular');
      });
    });
  }

}
