import { Component, inject, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { IFotos, ImagenesService } from 'src/app/services/imagenes.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cosas-feas',
  templateUrl: './cosas-feas.page.html',
  styleUrls: ['./cosas-feas.page.scss'],
})
export class CosasFeasPage implements OnInit {
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
    this.imagenesService.ObtenerFotosOrdenadas("cosas-feas").subscribe((fotos: IFotos[]) => {
      this.fotos = fotos;
    });
  }
}
