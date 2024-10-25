import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, getDocs, orderBy, query } from 'firebase/firestore/lite';
import { Observable } from 'rxjs';
import { IFotos } from './imagenes.service';

@Injectable({
  providedIn: 'root'
})
export class FireStoreService {
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
