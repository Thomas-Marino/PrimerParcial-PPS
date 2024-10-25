import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ImagenesService } from 'src/app/services/imagenes.service';
// import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts'
import { Chart, registerables } from 'chart.js';
import { ChartOptions } from 'chart.js';


@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.page.html',
  styleUrls: ['./graficos.page.scss'],
})
export class GraficosPage implements OnInit, OnDestroy {
  @ViewChild('pieCanvas') pieCanvas!: ElementRef;
  @ViewChild('barCanvas') barCanvas!: ElementRef;
  imagenesService = inject(ImagenesService);

  spinnerMostrandose: boolean;
  pieChart: any;
  barChart: any;

  constructor() { this.spinnerMostrandose = true; }

  ngOnInit(): void 
  {
    Chart.register(...registerables);
    this.CargarDatosVotacion();
    setTimeout( () => { this.spinnerMostrandose = false;}, 2000) 
  }

  ngOnDestroy(): void 
  {
    this.pieChart.destroy();
    this.barChart.destroy();
  }

  CargarDatosVotacion(): void 
  {
    // Cargar votos para fotos lindas (torta)
    this.imagenesService.ObtenerFotosOrdenadas('cosas-lindas').subscribe(fotos => {
      const labels = fotos.map(foto => foto.autor); // Etiquetas (autores de fotos, por ejemplo)
      const data = fotos.map(foto => foto.interacciones); // Votos de cada foto

      this.CrearGraficoDeTorta(labels, data);
    });

    // Cargar votos para fotos feas (barras)
    this.imagenesService.ObtenerFotosOrdenadas('cosas-feas').subscribe(fotos => {
      const labels = fotos.map(foto => foto.autor);
      const data = fotos.map(foto => foto.interacciones);

      this.CrearGraficoDeBarras(labels, data);
    });
  }

  CrearGraficoDeTorta(labels: string[], data: number[]): void 
  {
    if(this.pieChart) {this.pieChart.destroy()}

    this.pieChart = new Chart(this.pieCanvas.nativeElement, {
      type: 'pie', data: { labels: labels, datasets: [{ label: 'Interacciones', data: data, borderWidth: 1 }] },
      options: { responsive: true }
    });
  }

  CrearGraficoDeBarras(labels: string[], data: number[]): void 
  {
    if(this.barChart) {this.barChart.destroy()}
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: { labels: labels, datasets: [{ label: 'Interacciones', data: data, borderWidth: 1 }] },
      options: { responsive: true, scales: { y: { beginAtZero: true } } }
    });
  }
}