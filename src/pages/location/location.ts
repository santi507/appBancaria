import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { LocationService, GoogleMaps, GoogleMap, LatLng, GoogleMapsEvent, GoogleMapOptions, MyLocation, Marker } from '@ionic-native/google-maps';

import { DirectionPage } from '../direction/direction'
import { LocationProvider } from '../../providers/location/location';

declare var google;

@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  public locations = [];
  public directionsService = new google.maps.DirectionsService();
  public directionsDisplay = new google.maps.DirectionsRenderer();
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  origin: any;
  destination: any;

  constructor(public navCtrl: NavController, public loading: LoadingController, public platform: Platform, public locationsProvider: LocationProvider) {
    this.locations = locationsProvider.getLocations();
  }

  ionViewDidLoad() {
   this.loadMap();
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
    LocationService.getMyLocation().then( (myLocation: MyLocation) => {
      let mapElement = this.mapElement.nativeElement;
      let myPoint = myLocation.latLng;
      this.origin = new google.maps.LatLng(myPoint.lat, myPoint.lng);
      let mapOptions = {
        center: myPoint,
        zoom: 15
      }

      this.map = new google.maps.Map(mapElement, mapOptions);
      this.addMarker(myPoint, 'red', this.map);
      this.locations.forEach( location => {
        let marker = this.addMarker(location.coordinates, 'blue', this.map);
        marker.addListener('click', () => {
          this.destination = marker.getPosition();
          //this.drawRoute(this.map, this.origin, this.destination);
          this.showDirection(this.origin, this.destination);
        })
      });

    }).catch( (e) => {
      alert('Debes activar la geolocalización en las configuraciones de tu celular.');
    });
  }

  addMarker(position, color, map) {
    return new google.maps.Marker({
      position: position,
      icon: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
      map: map
    });
  }

  drawRoute(map, origin, destination) {
    

    this.directionsDisplay.setMap(map);

    this.directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode['TRANSIT']
    }, (res, status) => {
      if(status == google.maps.DirectionsStatus.OK){
        this.directionsDisplay.setDirections(res);
      }
    });

  }

  showDirection(origin, destination) {
    this.navCtrl.push(DirectionPage,{
      origin: origin,
      destination: destination
    });
  }


}
