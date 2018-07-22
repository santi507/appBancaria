import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationProvider {
  locations = [
    {
      "coordinates": {lat: 8.9771017, lng: -79.5222511},
      "description": "Torre Banco General, Calle Aquilino de la Guardia, Panamá"
    },
    {
      "coordinates": {lat: 8.985926, lng: -79.52404100000001},
      "description": "Banco General | Vía España, Vía España, Panamá"
    },
    {
      "coordinates":{lat: 8.968562, lng: -79.561328},
      "description": "Banco General | Albrook Mall, Panamá"
    },
    {
      "coordinates":{lat: 8.9848354, lng: -79.52833820000001},
      "description": "ATM Banco General, Calle Augusto Samuel Boyd, Panamá"
    },
    {
      "coordinates":{lat: 8.9743592, lng: -79.52914479999998},
      "description": "ATM BANCO General, Calle 47 Este, Panamá"
    },
    {
      "coordinates":{lat: 9.076530499999999, lng: -79.5248489},
      "description": "Banco General | Villa Zaíta, Panamá"
    },
    {
      "coordinates":{lat: 9.0755263, lng: -79.52392320000001},
      "description": "ATM/Banco General/ El Fuerte Milla 8, Panamá"
    }

  ];

  constructor(public http: HttpClient) {
    console.log('Hello LocationProvider Provider');
  }

  public getLocations() {
    return this.locations;
  }

}
