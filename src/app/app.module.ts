import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MapPage } from '../pages/map/map';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { TabHiddenDirective } from '../directives/tab-hidden/tab-hidden';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Diagnostic } from '@ionic-native/diagnostic';
import { GoogleMaps } from '@ionic-native/google-maps';
import { LocationProvider } from '../providers/location/location';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    MapPage,
    TabHiddenDirective
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      backButtonIcon:'ios-arrow-back'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    MapPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    Diagnostic,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocationProvider
  ]
})
export class AppModule {}
