import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { LogedComponent } from './loged/loged.component';
// import { HomePage } from './home/home.page';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { DeviceMotion, DeviceMotionAccelerationData } from '@awesome-cordova-plugins/device-motion/ngx';
import {  FormsModule  } from '@angular/forms';
// Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { LoginPage } from './pages/login/login.page';

const appRoutes:Routes=[

  {path:"",component:LoginPage},
  {path:"loged",component:LogedComponent},
  // {path: "splash",component:SplashscreenComponent}
];

@NgModule({
  //Aca van los modulos
  declarations: [AppComponent, LogedComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, RouterModule.forRoot(appRoutes), FormsModule, AngularFireModule.initializeApp(environment.firebaseConfig)],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, Flashlight, Vibration, ScreenOrientation, DeviceMotion],
  bootstrap: [AppComponent],
})
export class AppModule {}
