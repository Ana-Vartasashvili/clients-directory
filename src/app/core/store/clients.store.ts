import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { Client } from '../models/client.model'
import { inject } from '@angular/core'
import { ClientsHttpService } from '../services/clients-http.service'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { pipe, distinctUntilChanged, tap, switchMap, delay } from 'rxjs'
import { tapResponse } from '@ngrx/operators'
import { ClientsRequestFilters } from '../models/clients-http.model'
import { Router } from '@angular/router'

type ClientState = {
  clients: Client[]
  isLoading: boolean
  totalCount: number
  filter: ClientsRequestFilters
}

const initialState: ClientState = {
  clients: [],
  isLoading: false,
  totalCount: 0,
  filter: {},
}

export const ClientsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (store, clientsHttpService = inject(ClientsHttpService), router = inject(Router)) => ({
      updateFilterQuery: rxMethod<ClientsRequestFilters>(
        tap((filters) => {
          patchState(store, { filter: { ...filters } })
          router.navigate([], { queryParams: filters })
        })
      ),

      loadClientsByQuery: rxMethod<ClientsRequestFilters>(
        pipe(
          distinctUntilChanged(),
          tap(() => {
            patchState(store, { isLoading: true })
          }),
          delay(500),
          switchMap((filters) => {
            return clientsHttpService.getClients(filters).pipe(
              tapResponse({
                next: ({ items, totalCount }) => patchState(store, { clients: items, totalCount }),
                error: () => {
                  patchState(store, { clients: [] })
                },
                finalize: () => patchState(store, { isLoading: false }),
              })
            )
          })
        )
      ),
    })
  )
)
