import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LocationService, MyLocation } from '@ionic-native/google-maps';

import { LocationProvider } from '../../providers/location/location';

//variable para usar con el api de google maps
declare var google;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {

  public myLocation: any;
  public errorLocation: any;
  public origin: any;
  public destination: any;
  public map: any;
  public locations = [];
  public directionsService = new google.maps.DirectionsService();
  public directionsDisplay = new google.maps.DirectionsRenderer();

  //Obtener la referencia a map en la vista
  @ViewChild('map') mapElement: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, public locationsProvider: LocationProvider, public alertCtrl: AlertController) {
    this.locations = locationsProvider.getLocations();
  }

  ionViewDidLoad() {
    if(!this.errorLocation){
      this.showMap();
    }
    
  }

  showMap() {
    
    //Obtener la ubicación actual del dispositivo
    LocationService.getMyLocation().then( (myLocation: MyLocation) => {
      this.errorLocation = false
      let loader = this.loading.create({
        spinner: 'ios',
        content: 'Cargando ubicaciones...'
      });
      loader.present().then(()=>{
        let mapElement = this.mapElement.nativeElement;
        this.myLocation = myLocation.latLng;
        this.destination = this.navParams.get('destination');
        this.origin = new google.maps.LatLng(this.myLocation.lat, this.myLocation.lng);
        let mapOptions = {
          center: this.myLocation,
          zoom: 13
        }
          
        this.map = new google.maps.Map(mapElement, mapOptions);
        this.addMarker(this.myLocation, 'red', this.map);
        if(this.destination){
          this.addMarker(this.destination, 'blue', this.map);
        }else{
          this.loadLocations();
        }
        loader.dismiss();
      });
    }).catch( () => {
      this.errorLocation = true;
    });
      
  }

  loadLocations() {
    this.locations.forEach( location => {
      let marker = this.addMarker(location.coordinates, 'blue', this.map);
        marker.addListener('click', () => {
          this.destination = marker.getPosition();
          this.navCtrl.push(MapPage,{
            deviceLocation: this.myLocation,
            destination: this.destination,
            error: false
          });
          
        })
    });
  }

  addMarker(position, color, map) {
    return new google.maps.Marker({
      position: position,
      icon: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
      map: map
    });
  }

  drawRoute(travelMode) {
    

    this.directionsDisplay.setMap(this.map);

    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode[travelMode]
    }, (res, status) => {
      if(status == google.maps.DirectionsStatus.OK){
        this.directionsDisplay.setDirections(res);
      }else{
        const alert = this.alertCtrl.create({
          title: 'Modo de viaje',
          subTitle: 'Disculpe, seleccione otra forma de viaje.',
          buttons: ['Aceptar']
        });
        alert.present();
      }
    });

  }

}
