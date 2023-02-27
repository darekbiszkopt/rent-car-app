import { OrderModel } from './order-model';

export interface UpdateOrderResponse {
  success: boolean;
  data: OrderModel;
}
