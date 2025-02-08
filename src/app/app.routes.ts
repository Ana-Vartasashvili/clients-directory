import { Routes } from '@angular/router';
import { ClientsComponent } from './features/clients/clients.component';

export const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  { path: 'clients', component: ClientsComponent, title: 'Clients' },
];
