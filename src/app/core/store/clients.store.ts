import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'
import { Client } from '@core/models/client.model'
import { inject } from '@angular/core'
import { ClientsHttpService } from '@core/services/clients-http.service'
import { rxMethod } from '@ngrx/signals/rxjs-interop'
import { pipe, distinctUntilChanged, tap, switchMap, delay } from 'rxjs'
import { tapResponse } from '@ngrx/operators'
import { ClientsRequestFilters } from '../models/clients-http.model'
import { Router } from '@angular/router'
import { ErrorHandler } from '@utils/error.utils'
import { ToastService } from '@core/services/toast.service'

type ClientState = {
  clients: Client[]
  isLoading: boolean
  totalCount: number
  filter: ClientsRequestFilters
  currentPage: number
  pageSize: number
}

const initialState: ClientState = {
  clients: [],
  isLoading: false,
  totalCount: 0,
  filter: {},
  currentPage: 1,
  pageSize: 10,
}

export const ClientsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      clientsHttpService = inject(ClientsHttpService),
      router = inject(Router),
      toastService = inject(ToastService)
    ) => ({
      updateFilterQuery: rxMethod<ClientsRequestFilters>(
        tap((filters) => {
          patchState(store, { filter: { ...store.filter(), ...filters } })
          router.navigate([], { queryParams: store.filter() })
        })
      ),

      loadClientsByQuery: rxMethod<ClientsRequestFilters>(
        pipe(
          tap(() => {
            patchState(store, { isLoading: true })
          }),
          delay(500),
          switchMap((filters) => {
            return clientsHttpService.getClients(filters).pipe(
              tapResponse({
                next: ({ items, totalCount }) => patchState(store, { clients: items, totalCount }),
                error: (error) => {
                  patchState(store, { clients: [] })
                  toastService.error(
                    ErrorHandler.getErrorMessageSummary(error),
                    ErrorHandler.getErrorMessageDetails(error)
                  )
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
