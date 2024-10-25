import { inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Photo } from '@capacitor/camera';
import { getDownloadURL, getStorage, ref, uploadBytes, uploadString } from 'firebase/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage = getStorage();
  storageRef = ref(this.storage);

  async GuardarImagen(urlImagen: string, dataUrlImagen: any): Promise<void>
  {
    const imgRef = ref(this.storage, urlImagen); // Devuelve una StorageReference para la url pasada como parametro.
    uploadString(imgRef, dataUrlImagen, "data_url");
  }

  async ObtenerUrlDescarga(urlImagen: string): Promise<string>
  {
    const imgRef = ref(this.storage, urlImagen); // Devuelve una StorageReference para la url pasada como parametro.
    const urlDescarga = await getDownloadURL(imgRef); // Devuelve una download URL para la StorageReference pasada como parametro.
    return urlDescarga;
  }
}
