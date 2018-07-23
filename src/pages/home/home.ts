import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isRound: boolean = true;

  constructor(public modalCtrl: ModalController) {
 
  }

  forgetPass() {
    console.log('Olvidé mi contraseña');
  }
  

}
