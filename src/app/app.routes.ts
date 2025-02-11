import { Routes } from '@angular/router'
import { ClientsComponent } from '@features/clients/clients.component'
import { ClientDetailsComponent } from '@features/client-details/client-details.component'
import { ClientDetailsResolver } from '@core/resolvers/client-details.resolver'

export const routes: Routes = [
  { path: '', redirectTo: 'clients', pathMatch: 'full' },
  {
    path: 'clients',
    component: ClientsComponent,
    title: 'Clients',
  },
  {
    path: 'clients/:id',
    component: ClientDetailsComponent,
    title: 'Client Details',
    resolve: {
      client: ClientDetailsResolver,
    },
  },
]
