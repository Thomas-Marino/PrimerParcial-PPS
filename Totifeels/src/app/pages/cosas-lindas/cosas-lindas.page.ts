import { Component, inject, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { IFotos, ImagenesService } from 'src/app/services/imagenes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cosas-lindas',
  templateUrl: './cosas-lindas.page.html',
  styleUrls: ['./cosas-lindas.page.scss'],
})
export class CosasLindasPage implements OnInit {
  imagenesService = inject(ImagenesService);
  userService = inject(UserService);
  fireStoreService = inject(FirestoreService);

  spinnerMostrandose: boolean;
  fotos: IFotos[] = [];

  constructor() { this.spinnerMostrandose = true; }

  ngOnInit(): void 
  { 
    this.ObtenerFotos();
    setTimeout( () => { this.spinnerMostrandose = false;}, 2000) 
  }

  ObtenerFotos(): void
  {
    this.imagenesService.ObtenerFotosOrdenadas("cosas-lindas").subscribe((fotos: IFotos[]) => {
      this.fotos = fotos;
    });
  }
}
