import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  firestore = inject(AngularFirestore);
  
  constructor() {}

  GuardarContenido(coleccion: string, datos: any): void
  {
    const col = this.firestore.collection(coleccion);

    if(datos.length > 0)
    {
      for (const dato of datos) { col.add(dato); }
    }
    else { col.add(datos); }
  }
}
