import { Client, ClientGender } from './client.model'
import { PaginatedResponse } from './paginated-response.model'

export interface ClientsResponse extends PaginatedResponse<Client> {}

export interface ClientsRequestFilters {
  id: number | null
  name: string | null
  gender: ClientGender | null
  documentId: string | null
  phoneNumber: string | null
  legalAddressCountry: string | null
  legalAddressCity: string | null
  legalAddressLine: string | null
  actualAddressCountry: string | null
  actualAddressCity: string | null
  actualAddressLine: string | null
}
