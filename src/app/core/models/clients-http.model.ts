import { Client, ClientGender } from './client.model'
import { PaginatedResponse } from './paginated-response.model'

export interface ClientsResponse extends PaginatedResponse<Client> {}

export type ClientsRequestFilters = Partial<{
  Id: number | null
  Name: string | null
  Gender: ClientGender | null
  DocumentId: string | null
  PhoneNumber: string | null
  LegalAddressCountry: string | null
  LegalAddressCity: string | null
  LegalAddressLine: string | null
  ActualAddressCountry: string | null
  ActualAddressCity: string | null
  ActualAddressLine: string | null
  Page: number | null
  PageSize: number | null
  SortBy: ClientsSortBy | null
}>

export enum ClientsSortBy {
  CreatedAt = 'createdAt',
  CreatedAtDesc = 'createdAt_desc',
  lastName = 'lastName',
  lastNameDesc = 'lastName_desc',
}
