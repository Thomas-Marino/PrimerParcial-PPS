import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { authResponse, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage 
{
  router = inject(Router);

  public sesionIniciada:boolean;
  public correo:string;
  public password:string;
  public mensajeAMostrar:string;
  public mensajeError: boolean = false;

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
      this.mensajeError = false;
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
      this.mensajeError = true;
      if(ingresoUsuario.mensajeError) { this.mensajeAMostrar = ingresoUsuario.mensajeError; }
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
