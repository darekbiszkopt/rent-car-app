import { inject, Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClientModel } from './model/client-model';
import { ClientResponse } from './model/client-response';
import { UpdateClientResponse } from './model/update-client-response';
import { createRequestOption, Pagination } from '../../shared/util/request-util';
import { DeleteResponse } from '../car/model/delete-response';

export interface ClientCriteria {
  id?: number;
  mark?: string;
  model?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private resourceUrl = `${ SERVER_API_URL }/client`;
  private readonly http = inject(HttpClient);

  getAllClient = (clientsCriteria: ClientCriteria, pageable: Pagination): Observable<ClientResponse> => {
    const params = createRequestOption(clientsCriteria, pageable);
    return this.http.get<ClientResponse>(`${ this.resourceUrl }`, { params });
  };

  createClient = (req: Omit<ClientModel, 'id'>): Observable<UpdateClientResponse> =>
    this.http.post<UpdateClientResponse>(`${ this.resourceUrl }`, req);

  updateClient = (req: ClientModel): Observable<UpdateClientResponse> =>
    this.http.put<UpdateClientResponse>(`${ this.resourceUrl }/${ req.id }`, req);

  deleteClient = (id: number): Observable<DeleteResponse> =>
    this.http.delete<DeleteResponse>(`${ this.resourceUrl }/${ id }`);
}
