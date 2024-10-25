import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { IFotos } from './imagenes.service';

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

  async VotarFoto(coleccion: string, fotoUrl: string, nombreUsuario: string): Promise<void>
  {
    const idFoto = await this.ObtenerIdPorUrl(coleccion, fotoUrl);
    const docRef = this.firestore.collection(coleccion).doc(idFoto);
    // Obtener los datos del documento
    const docSnapshot = await docRef.get().toPromise();
    if (docSnapshot && docSnapshot.exists) 
    {
      const data = docSnapshot.data() as IFotos;
      
      // Verifica que los datos existan y asigna valores
      let valorInteracciones: number = parseInt(data.interacciones.toString()) || 0; // Maneja caso donde interacciones puede ser undefined
      let reaccionUsuarios: any[] = data.reaccionUsuarios || []; // Maneja caso donde reaccionUsuarios puede ser undefined

      console.log("Datos obtenidos:", data);
      console.log("Interacciones:", valorInteracciones);
      
      // Agregar el nombre del usuario a la lista de reacciones
      reaccionUsuarios.push(nombreUsuario);
      
      // Actualizar el documento
      await docRef.update({ 
          interacciones: valorInteracciones + 1, 
          reaccionUsuarios: reaccionUsuarios 
      });

      console.log("Actualización completada");
    }
  }

  ObtenerIdPorUrl(coleccion: string, fotoUrl: string): any
  {
    return new Promise((resolve) => {
      this.firestore.collection(coleccion, ref => ref.where('foto', '==', fotoUrl)).get().subscribe(snapshot => {
        const id = snapshot.docs[0].id; 
        resolve(id);
      });
    });
  }

}
