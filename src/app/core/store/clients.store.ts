import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals'
import { Client } from '../models/client.model'
import { computed, inject } from '@angular/core'
import { ClientsHttpService } from '../services/clients-http.service'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { pipe, debounceTime, distinctUntilChanged, tap, switchMap } from 'rxjs'
import { tapResponse } from '@ngrx/operators'

type ClientState = {
  clients: Client[]
  isLoading: boolean
}

const initialState: ClientState = {
  clients: [],
  isLoading: false,
}

export const ClientsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ clients }) => ({
    clientsCount: computed(() => clients.length),
  })),
  withMethods((store, clientsHttpService = inject(ClientsHttpService)) => ({
    loadClientsByQuery: rxMethod<void>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return clientsHttpService.getClients().pipe(
            tapResponse({
              next: ({ items }) =>
                patchState(store, {
                  clients: items,
                }),
              error: (err) => {
                patchState(store, {
                  clients: [],
                })
              },
              finalize: () => patchState(store, { isLoading: false }),
            })
          )
        })
      )
    ),
  }))
)
