export interface ClientModel {
  id: number;
  firstname: string;
  surname: string;
  age: number;
  driver_license_number: string;
  street: string;
  house_number?: string;
  apartment_number?: string;
  city: string;
  post_code: string;
  tenant_id?: number;
}
