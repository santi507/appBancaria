import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';

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
    this.myLocation = navParams.get('deviceLocation');
    this.errorLocation = navParams.get('error');
    this.locations = locationsProvider.getLocations();
  }

  ionViewDidLoad() {
    if(!this.errorLocation){
      this.loadMap();
    }
    
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
    let mapElement = this.mapElement.nativeElement;
    let myPoint = this.myLocation;
    this.destination = this.navParams.get('destination');
    this.origin = new google.maps.LatLng(myPoint.lat, myPoint.lng);
      let mapOptions = {
        center: myPoint,
        zoom: 13
      }
      
      this.map = new google.maps.Map(mapElement, mapOptions);
      this.addMarker(myPoint, 'red', this.map);
      if(this.destination){
        this.addMarker(this.destination, 'blue', this.map);
      }else{
        this.loadLocations();
      }
      
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
