import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { FirebaseStoreService } from './firebase/firebase-store.service';

export interface IPuntaje {
  fecha: any;
  dificultad: any;
  tiempo: number;
  tiempoParseado: any;
  nombreUsuario: any;
}

@Injectable({
  providedIn: 'root'
})
export class PuntajesService {
  firestoreService = inject(FirebaseStoreService);
  userService = inject(UserService);

  constructor() { }

  GuardarPuntaje(puntaje: number, dificultad: string): void
  {
    const fecha = new Date();
    const fechaFormateada = `${fecha.getFullYear()}/${fecha.getMonth()+1}/${fecha.getDate()}`;
    const datosPuntaje = {nombreUsuario: this.userService.ObtenerNombreUsuario(), tiempo: puntaje, tiempoParseado: puntaje + " segundos", dificultad: dificultad, fecha: fechaFormateada};
    this.firestoreService.GuardarContenido("Puntajes", datosPuntaje);
  }

  ObtenerPuntajes(dificultad: string): Observable<IPuntaje[]>
  {
    return this.firestoreService.firestore.collection<IPuntaje>("Puntajes", ref => ref.where("dificultad", "==", dificultad).orderBy("tiempo", "asc")).valueChanges();
  }
}
