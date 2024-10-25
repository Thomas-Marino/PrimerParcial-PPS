import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'ingreso', loadChildren: () => import('./pages/ingreso/ingreso.module').then( m => m.IngresoPageModule)}, 
  { path: 'inicio', loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule) },
  { path: 'splash', loadChildren: () => import('./pages/splash/splash.module').then( m => m.SplashPageModule) },
  {
    path: 'puntajes',
    loadChildren: () => import('./pages/puntajes/puntajes.module').then( m => m.PuntajesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
