import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FirestoreService } from './firestore.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authService = inject(AuthService);
  fireStoreService = inject(FirestoreService);

  constructor() { }

  // BehaviorSubject para emitir el nombre del usuario
  private nombreUsuarioSubject = new BehaviorSubject<string>('');
  observableNombreUsuario = this.nombreUsuarioSubject.asObservable();

  AsignarNombreUsuario(nombre: string): void 
  { 
    this.nombreUsuarioSubject.next(nombre); 
  }

  // Función para obtener el valor actual del usuario (sin necesidad de suscribirse)
  ObtenerNombreUsuario(): string 
  { 
    const usuarioLocalStorage = localStorage.getItem("usuarioLogueado");
    
    if(this.nombreUsuarioSubject.getValue() != "") { return this.nombreUsuarioSubject.getValue(); }
    if(usuarioLocalStorage) { return usuarioLocalStorage; } 
    return "";
  }
}
