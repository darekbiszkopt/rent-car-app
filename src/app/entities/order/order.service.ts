import { inject, Injectable } from '@angular/core';
import { SERVER_API_URL } from '../../app.constants';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderModel } from './model/order-model';
import { OrderResponse } from './model/order-response';
import { UpdateOrderResponse } from './model/update-order-response';
import { createRequestOption, Pagination } from '../../shared/util/request-util';
import { DeleteResponse } from '../car/model/delete-response';

export interface OrderCriteria {
  id?: number;
  mark?: string;
  model?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private resourceUrl = `${ SERVER_API_URL }/order`;
  private readonly http = inject(HttpClient);

  getAllOrder = (ordersCriteria: OrderCriteria, pageable: Pagination): Observable<OrderResponse> => {
    const params = createRequestOption(ordersCriteria, pageable);
    return this.http.get<OrderResponse>(`${ this.resourceUrl }`, { params });
  };

  createOrder = (req: Omit<OrderModel, 'id'>): Observable<UpdateOrderResponse> =>
    this.http.post<UpdateOrderResponse>(`${ this.resourceUrl }`, req);

  updateOrder = (req: OrderModel): Observable<UpdateOrderResponse> =>
    this.http.put<UpdateOrderResponse>(`${ this.resourceUrl }/${ req.id }`, req);

  deleteOrder = (id: number): Observable<DeleteResponse> =>
    this.http.delete<DeleteResponse>(`${ this.resourceUrl }/${ id }`);
}
