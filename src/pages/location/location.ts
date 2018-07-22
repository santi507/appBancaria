import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location/location';

declare var google: any;

@Component({
  selector: 'page-location',
  templateUrl: 'location.html'
})
export class LocationPage {
  locations = [];
  @ViewChild('map') mapRef: ElementRef;

  constructor(public navCtrl: NavController, public loading: LoadingController, public locationsProvider: LocationProvider) { 
    this.locations = locationsProvider.getLocations();
  }

  ionViewDidLoad() {
    this.showMap();
  }

  showMap() {
    
    let loader = this.loading.create({
      spinner: 'ios',
      content: 'Cargando ubicaciones...',
    });

    const location = new google.maps.LatLng(8.983333, -79.516670);


    const options = {
      center: location,
      zoom: 10
    }
 
    const map = new google.maps.Map(this.mapRef.nativeElement, options);

    loader.present().then( () => {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( (position) => { 
          var pos = { 
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var mapa = new google.maps.Map(this.mapRef.nativeElement, {
            center: pos,
            zoom: 10
          });
          this.addMarker(pos, mapa,'red');
          this.locations.forEach(location => {
            this.addMarker(location.coordinates,mapa,'blue');
          });
        })
      }
      
      loader.dismiss();
    });

  }


  addMarker(position, map, color) {
    return new google.maps.Marker({
      position,
      icon: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
      map
    })
  }


}
