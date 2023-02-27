export interface OrderModel {
  id?: number;
  from_date: string;
  to_date: string;
  client_id?: number;
  car_id: number;
  total_price: number;
  is_paid: number;
  is_rent: number;
  is_returned: number;
  is_additional_insurance: number;
  comments: string;
  client_firstname: string;
  client_surname: string;
  client_driver_license_number: string;
  car_mark: string;
  car_model: string;
  car_engine_capacity:number,
  car_color: string,
  car_gearbox_type: string,
  car_type: string
}

