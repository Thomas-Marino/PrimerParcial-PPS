import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';
import { authResponse, AuthService } from 'src/app/services/auth.service';
// import { authResponse, AuthService } from '../../services';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  router = inject(Router);
  vibration = inject(Vibration);

  public sesionIniciada:boolean;
  public correo:string;
  public password:string;
  public mensajeAMostrar:string;

  constructor(public authService:AuthService)
  {
    this.correo = "";
    this.password = "";
    this.sesionIniciada = false;
    this.mensajeAMostrar = ""
  }

  async IniciarSesion(correoIngresado:any, passIngresada:any)
  {
    const ingresoUsuario:authResponse = await this.authService.IniciarSesion(correoIngresado, passIngresada);
    if(!ingresoUsuario.huboError && ingresoUsuario.mensajeExito) 
    { 
      this.sesionIniciada = true;
      this.mensajeAMostrar = ingresoUsuario.mensajeExito;
      setTimeout(() => { 
        this.router.navigateByUrl("loged");
        this.correo = "";
        this.password = "";
        this.mensajeAMostrar = ""; 
      }, 2000);
    }
    else 
    {
      if(ingresoUsuario.mensajeError) { this.mensajeAMostrar = ingresoUsuario.mensajeError; }
      this.vibration.vibrate(5000);
      this.password = "";
    } 
  }

  InicioSesionRapido(rol:string) : void
  {
    switch(rol)
    {
      case "admin":
        this.correo = "admin@gmail.com";
        this.password = "administrador";
        break;
      case "cliente":
        this.correo = "cliente@gmail.com";
        this.password = "cliente";
        break;
      case "empleado":
        this.correo = "empleado@gmail.com";
        this.password = "empleado";
        break;
    }
  }

}
