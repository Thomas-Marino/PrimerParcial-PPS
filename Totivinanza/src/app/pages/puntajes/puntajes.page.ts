import { Component, inject, OnInit } from '@angular/core';
import { FirebaseStoreService } from '../../services/firebase/firebase-store.service';
import { Observable } from 'rxjs';
import { IPuntaje, PuntajesService } from 'src/app/services/puntajes.service';

@Component({
  selector: 'app-puntajes',
  templateUrl: './puntajes.page.html',
  styleUrls: ['./puntajes.page.scss'],
})
export class PuntajesPage implements OnInit {
  fireStoreService = inject(FirebaseStoreService);
  puntajesService = inject(PuntajesService);
  mostrarTabla: boolean;
  observablePuntajes!: Observable<IPuntaje[]>;

  dificultadSeleccionada: string = '';

  constructor() 
  {
    this.mostrarTabla = false;
    this.spinnerMostrandose = true; 
  }
  ngOnInit(): void {
    setTimeout( () => { this.spinnerMostrandose = false;}, 2000) 
  }

  CambiarTablaDePuntajes(dificultad: string): void
  {
    this.dificultadSeleccionada = dificultad;
    this.observablePuntajes = this.puntajesService.ObtenerPuntajes(dificultad);
    this.mostrarTabla = true;
    this.observablePuntajes.forEach(valor => console.log(valor))
  }

  spinnerMostrandose: boolean;


  getHeaderClass() {
    switch (this.dificultadSeleccionada) {
      case 'facil':
        return 'tabla-facil-header';
      case 'medio':
        return 'tabla-medio-header';
      case 'dificil':
        return 'tabla-dificil-header';
      default:
        return '';
    }
  }

  getBodyClass() {
    switch (this.dificultadSeleccionada) {
      case 'facil':
        return 'tabla-facil-body';
      case 'medio':
        return 'tabla-medio-body';
      case 'dificil':
        return 'tabla-dificil-body';
      default:
        return '';
    }
  }
}

