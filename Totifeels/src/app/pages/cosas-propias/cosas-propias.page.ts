import { Component, inject, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { IFotos, ImagenesService } from 'src/app/services/imagenes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cosas-propias',
  templateUrl: './cosas-propias.page.html',
  styleUrls: ['./cosas-propias.page.scss'],
})
export class CosasPropiasPage implements OnInit {
  imagenesService = inject(ImagenesService);
  userService = inject(UserService);
  fireStoreService = inject(FirestoreService);

  spinnerMostrandose: boolean;
  fotosLindasSubidas: IFotos[] = [];
  fotosFeasSubidas: IFotos[] = [];

  constructor() { this.spinnerMostrandose = true; }

  ngOnInit(): void 
  { 
    this.ObtenerFotosLindas();
    this.ObtenerFotosFeas();
    setTimeout( () => { this.spinnerMostrandose = false;}, 2000) 
  }

  ObtenerFotosLindas(): void
  {
    this.imagenesService.ObtenerFotosOrdenadas("cosas-lindas").subscribe((fotos: IFotos[]) => {
      for(const foto of fotos) { if (foto.autor == this.userService.ObtenerNombreUsuario()) {this.fotosLindasSubidas.push(foto)} }
    });
  }

  ObtenerFotosFeas(): void
  {
    this.imagenesService.ObtenerFotosOrdenadas("cosas-feas").subscribe((fotos: IFotos[]) => {
      for(const foto of fotos) { if (foto.autor == this.userService.ObtenerNombreUsuario()) {this.fotosFeasSubidas.push(foto)} }
    });
  }
}
