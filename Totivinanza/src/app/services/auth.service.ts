import { inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, User } from '@angular/fire/auth'
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';

export interface authResponse
{
	huboError : boolean;
	mensajeError? : string;
	mensajeExito? : string; 
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	auth = inject(AngularFireAuth);
	router = inject(Router);

	constructor() {}
  
	async IniciarSesion(correo:string, password:string) : Promise<authResponse>
	{
		let authResponse:authResponse = {huboError: false};
		try
		{
			const loginResponse = await this.auth.signInWithEmailAndPassword(correo, password).catch((error:FirebaseError) => {
				if(error.code == "auth/invalid-email") { error.message = "Asegurese de ingresar un correo electrónico válido (ejemplo@correo.com)"; }
				else if(error.code == "auth/missing-password") { error.message = "Asegurese de ingresar una contraseña"; }
				else if(error.code == "auth/invalid-credential") { error.message = "Credenciales invalidas, verifique si el correo y la contraseña fueron ingresados correctamente"; }
				error.stack = ""; 
				authResponse.huboError = true;
				authResponse.mensajeError = error.message;
			});

			if(loginResponse)
			{
				console.log(`Usuario logueado existosamente! Correo: ${loginResponse.user?.email}`);
				authResponse.mensajeExito = "El ingreso del usuario fue exitoso! Redirigiendo al inicio...";
        		localStorage.setItem("usuarioLogueado", correo.split("@")[0]);
				return authResponse;
			}

			return authResponse;
		}
		catch(error:any)
		{
			console.error(error)
			authResponse.huboError = true;
			authResponse.mensajeError = error;
			return authResponse;
		}   
	}

	ObtenerSesion() : User | null
	{
		return getAuth().currentUser;
	}

	async CerrarSesion() : Promise<void>
	{
		if(this.ObtenerSesion())
		{
			this.auth.signOut();
      		localStorage.removeItem("usuarioLogueado");
			this.router.navigateByUrl("ingreso");
		}
		else
		{
			console.log("No hay ninguna sesion activa");
		}
	}
}

