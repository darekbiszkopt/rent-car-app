import { ClientModel } from './client-model';

export interface UpdateClientResponse {
  success: boolean;
  data: ClientModel;
}
