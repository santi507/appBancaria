import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalController, LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { Diagnostic } from '@ionic-native/diagnostic';
import { LocationService, GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent, GoogleMapOptions, MyLocation, Marker } from '@ionic-native/google-maps';

import { LocationProvider } from '../../providers/location/location';

@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  public locations = [];
  public points = [];
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('error') errorElement: ElementRef;
  private map: GoogleMap;
  private location: LatLng;

  constructor(public modalCtrl: ModalController, public loading: LoadingController, private diagnostic: Diagnostic, public platform: Platform, private googleMaps: GoogleMaps, public locationsProvider: LocationProvider) {
    this.locations = locationsProvider.getLocations();
  }

  ionViewDidLoad() {
    this.points = [];
    this.checkLocation();
  }

  loadMap() {
    let loader = this.loading.create({
      spinner: 'ios',
      content: 'Cargando ubicaciones...'
    });
    loader.present().then(()=>{
      this.showMap();
      loader.dismiss();
    });
  }

  showMap() {
    LocationService.getMyLocation().then((myLocation: MyLocation) => {
      let element = this.mapElement.nativeElement;
      let options: GoogleMapOptions = {
        camera: {
          target: myLocation.latLng,
          zoom: 12
        }
      };

      this.points.push(myLocation.latLng);

      this.map = GoogleMaps.create(element, options);
      this.addMarker(myLocation.latLng, this.map,'red');
      this.locations.forEach(location => {
        this.addMarker(location.coordinates, this.map, 'blue');
      });
    });
  }


  addMarker(location, mapa, color) {
    return mapa.addMarker({
      icon: color,
      position: location
    }).then( (marker: Marker) => {
        marker.addEventListener(GoogleMapsEvent.MARKER_CLICK).subscribe((m) => {
          this.points.push(m[0]);
          // Show modal
          let directioModal = this.modalCtrl.create('DirectionPage', { points: this.points });
          
          directioModal.present();
        });
    });
  }


  checkLocation(){
    this.platform.ready().then(() => {
      this.diagnostic.isLocationEnabled().then( (enabled) => {
        this.loadMap();
      }).catch( (e) => {
        alert('Debes activar la geolocalización en las configuraciones de tu celular');
      });
    });
  }

}
