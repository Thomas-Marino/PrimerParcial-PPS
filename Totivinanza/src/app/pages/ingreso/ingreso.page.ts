import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { authResponse, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-ingreso',
  templateUrl: './ingreso.page.html',
  styleUrls: ['./ingreso.page.scss'],
})
export class IngresoPage {
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
        this.router.navigateByUrl("inicio");
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
        console.log("caso admin");
        this.correo = "admin@admin.com";
        this.password = "111111";
        break;
      case "usuario":
        this.correo = "usuario@usuario.com";
        this.password = "333333";
        break;
      case "tester":
        this.correo = "tester@tester.com";
        this.password = "555555";
        break;
      case "invitado":
        this.correo = "invitado@invitado.com";
        this.password = "222222";
        break;
    }
  }

}
