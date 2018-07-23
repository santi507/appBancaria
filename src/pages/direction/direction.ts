import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google;

@IonicPage()
@Component({
  selector: 'page-direction',
  templateUrl: 'direction.html',
})
export class DirectionPage {

  public directionsService = new google.maps.DirectionsService();
  public directionsDisplay = new google.maps.DirectionsRenderer();
 
  @ViewChild('mapDirection') mapDirectionElement: ElementRef;
  map: any;
  origin: any;
  destination: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.origin = navParams.get('origin');
    this.destination = navParams.get('destination');
  }

  ionViewDidLoad() {
    this.showMapDirection();
  }

  loadMapDirection() {
    
  }

  showMapDirection() {
    let mapDirectionElement = this.mapDirectionElement.nativeElement;
    let mapDirectionOptions = {
      center: this.origin,
      zoom: 15
    }

    this.map = new google.maps.Map(mapDirectionElement, mapDirectionOptions);
    this.addMarker(this.origin, 'red',this.map);
    this.addMarker(this.destination, 'blue',this.map);
  }

  addMarker(position, color, map) {
    return new google.maps.Marker({
      position: position,
      icon: `http://maps.google.com/mapfiles/ms/icons/${color}-dot.png`,
      map: map
    });
  }

  drawRoute() {

    this.directionsDisplay.setMap(this.map);

    this.directionsService.route({
      origin: this.origin,
      destination: this.destination,
      travelMode: google.maps.TravelMode['TRANSIT']
    }, (res, status) => {
      if(status == google.maps.DirectionsStatus.OK){
        this.directionsDisplay.setDirections(res);
      }
    });

  }

}
