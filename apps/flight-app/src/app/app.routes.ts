import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation'
import { PassengerMf } from '../mf-types';
import { BasketComponent } from './basket/basket.component';
import { HomeComponent } from './home/home.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'basket',
    component: BasketComponent,
    outlet: 'aux'
  },
  {
    path: 'mf-passenger',
    loadChildren: () => loadRemoteModule<PassengerMf>({
      type: 'module',
      remoteEntry: 'http://localhost:4201/remoteEntry.js',
      exposedModule: './module'
    })
      .then(esm => esm.PassengerModule)
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
