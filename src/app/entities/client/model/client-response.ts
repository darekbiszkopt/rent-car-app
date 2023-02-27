import { ClientModel } from './client-model';

export interface ClientResponse {
  success: boolean;
  data: ClientModel[];
  count: number;
}
