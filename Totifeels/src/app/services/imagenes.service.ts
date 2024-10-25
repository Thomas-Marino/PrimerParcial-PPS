import { inject, Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { addDoc, collection, getDocs, setDoc, doc, updateDoc } from 'firebase/firestore/lite';
import { uploadString } from 'firebase/storage';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';
import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { UserService } from './user.service';

export interface IFotos 
{
  foto: string;
  autor: string;
  fecha: string;
  hora: string;
  interacciones: number;
  reaccionUsuarios: any[];
}

@Injectable({
  providedIn: 'root'
})
export class ImagenesService 
{
  fireStoreService = inject(FirestoreService);
  fireStorageService = inject(StorageService);
  authService = inject(AuthService);
  userService = inject(UserService);
  
  seccionElegida: string;
  flagLoadingPublicaciones: boolean;
  cosasLindasDB: any[];

  constructor() 
  {
    this.seccionElegida = "cosas lindas"
    this.flagLoadingPublicaciones = true;
    this.cosasLindasDB = [];
  }

  async GuardarFoto(categoria: string): Promise<void>
  {
    // -- Espero a que el usuario tome la foto.
    const fotoTomada = await Camera.getPhoto({ resultType: CameraResultType.DataUrl, source: CameraSource.Camera, quality: 100, webUseInput: true });
    const fecha: Date = new Date();
    const fechaFormateada = fecha.toLocaleDateString().replace(/(\/)/g, "");
    const horarioFormateado = `${fecha.getHours()}${fecha.getMinutes()}${fecha.getSeconds()}`;
    const urlImagen = `${categoria}/${this.userService.ObtenerNombreUsuario()}/${fechaFormateada}${horarioFormateado}`;
    // -- Espero a que se guarde la foto en FireStorage y genero el url de descarga.
    await this.fireStorageService.GuardarImagen(urlImagen, fotoTomada.dataUrl);
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2 segundos de espera
    const urlDescarga: string = await this.fireStorageService.ObtenerUrlDescarga(urlImagen);
    // -- Guardo los datos de la foto en FireStore.
    const datosFoto = {
      foto: urlDescarga,
      autor: this.userService.ObtenerNombreUsuario(),
      fecha: fecha.toLocaleDateString(),
      hora: fecha.toLocaleTimeString(),
      interacciones: 0,
      reaccionUsuarios: []
    }

    this.fireStoreService.GuardarContenido(categoria, datosFoto);
  }

  ObtenerFotosOrdenadas(categoria: string): Observable<IFotos[]>
  {
    return this.fireStoreService.firestore.collection<IFotos>(categoria, ref => ref.orderBy("fecha", "desc")).valueChanges();
  }

}