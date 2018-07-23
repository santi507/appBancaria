import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google: any;


@IonicPage()
@Component({
  selector: 'page-direction',
  templateUrl: 'direction.html',
})
export class DirectionPage {

  public points;
  @ViewChild('map') mapRef: ElementRef;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.points = this.navParams.get('points');
  }


  ionViewDidLoad() {
    this.showMap();
  }

  showMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    const location = new google.maps.LatLng(8.983333, -79.516670);
    
    const options = {
      center: location,
      zoom: 10
    };

    const map = new google.maps.Map(document.getElementById('mapDirection'), options);
    directionsDisplay.setMap(map);
  }

}
