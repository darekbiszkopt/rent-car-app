import { OrderModel } from './order-model';

export interface OrderResponse {
  success: boolean;
  data: OrderModel[];
  count: number;
}
