import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isRound: boolean = true;

  constructor(public navCtrl: NavController) {
 
  }

  forgetPass() {
    console.log('Olvidé mi contraseña');
  }

}
