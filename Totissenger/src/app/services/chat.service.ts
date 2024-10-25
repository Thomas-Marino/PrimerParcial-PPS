import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { UserService } from './user.service';

export interface IMensaje {
  mensaje: string;
  fechaMensaje: Date;
  fechaMensajeFormateada: string;
  usuario: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService 
{
  fireStoreService: FirestoreService = inject(FirestoreService);
  authService: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);
  
  mostrarChat:boolean = false;

  constructor() 
  { 
    this.authService.observableFlagUsuarioLogueado.subscribe(flag => { this.mostrarChat = flag; });
    if (localStorage.getItem("usuarioLogueado")) { this.mostrarChat = true; }
  }

  ObtenerMensajes(aula: "Aula-A" | "Aula-B"): Observable<IMensaje[]>
  {
    return this.fireStoreService.firestore.collection<IMensaje>(aula, ref => ref.orderBy('fechaMensaje')).valueChanges();
  }

  async GuardarMensaje(mensaje: string, aula: "Aula-A" | "Aula-B"): Promise<void> 
  {
    if(mensaje.trim()) 
    {
      const fecha = new Date();
      const fechaFormateada = `${fecha.getFullYear()}/${fecha.getMonth() + 1}/${fecha.getDate()} a las ${fecha.getHours()}:${fecha.getMinutes()}`;
      const usuario: string = this.userService.ObtenerNombreUsuario();
      const objetoMensaje: IMensaje = { mensaje: mensaje, fechaMensaje: fecha, fechaMensajeFormateada: fechaFormateada, usuario: usuario };
      this.fireStoreService.GuardarContenido(aula, objetoMensaje);
    }
  }
}