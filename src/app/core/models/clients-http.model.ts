import { Client } from './client.model';
import { PaginatedResponse } from './paginated-response.model';

export interface ClientsResponse extends PaginatedResponse<Client> {}
