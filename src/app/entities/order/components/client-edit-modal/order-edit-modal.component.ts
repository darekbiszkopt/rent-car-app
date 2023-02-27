import { Component } from '@angular/core';

@Component({
  templateUrl: './order-edit-modal.component.html',
  styles: [`.modal-body { max-height: 70vh; overflow-y: scroll; }`]
})
export class OrderEditModalComponent {
  // TODO
  // orderModel?: OrderModel;
  // details = false;
  // ChestType = ChestType;
  // CarType = CarType;
  //
  // orderForm = this.fb.group({
  //   mark: ['', [Validators.required]],
  //   model: ['', [Validators.required]],
  //   engine_capacity: ['', [Validators.required]],
  //   color: ['', [Validators.required]],
  //   gearbox_type: '',
  //   car_type: '',
  //   price_per_day: 0,
  //   tenant_id: [0, [Validators.required]]
  // });
  //
  //
  // id: number;
  // from_date: Date;
  // to_date: Date;
  // client_id?: number;
  // car_id: number;
  // total_price: number;
  // is_paid: number;
  // is_rent: number;
  // is_returned: number;
  // is_additional_insurance: number;
  // comments: string;
  // client_firstname: string;
  // client_surname: string;
  // car_mark: string;
  // car_model: string;
  //
  // constructor(private readonly activeModal: NgbActiveModal, private readonly fb: NonNullableFormBuilder) {
  // }
  //
  // static open(ngbModal: NgbModal, carModel?: OrderModel, details?: boolean): NgbModalRef {
  //   const modal = ngbModal.open(OrderEditModalComponent, {
  //     centered: true
  //   });
  //
  //   modal.componentInstance.carModel = carModel;
  //   modal.componentInstance.details = details;
  //
  //   return modal;
  // }
  //
  // get markControl(): FormControl<string> {
  //   return this.orderForm.controls.mark;
  // }
  //
  // get modelControl(): FormControl<string> {
  //   return this.orderForm.controls.model;
  // }
  //
  // get engine_capacityControl(): FormControl<string> {
  //   return this.orderForm.controls.engine_capacity;
  // }
  //
  // get colorControl(): FormControl<string> {
  //   return this.orderForm.controls.color;
  // }
  //
  // get gearbox_typeControl(): FormControl<string> {
  //   return this.orderForm.controls.gearbox_type;
  // }
  //
  // get car_typeControl(): FormControl<string> {
  //   return this.orderForm.controls.car_type;
  // }
  //
  // get price_per_dayControl(): FormControl<number> {
  //   return this.orderForm.controls.price_per_day;
  // }
  //
  // get tenant_idControl(): FormControl<number> {
  //   return this.orderForm.controls.tenant_id;
  // }
  //
  // ngOnInit(): void {
  //   this.initForm();
  // }
  //
  // onDismiss(): void {
  //   this.activeModal.close();
  // }
  //
  // private initForm(): void {
  //   if (this.orderModel) {
  //     this.orderForm.patchValue({
  //       mark: this.orderModel.mark || '',
  //       model: this.orderModel.model || '',
  //       engine_capacity: this.orderModel.engine_capacity || '',
  //       color: this.orderModel.color || '',
  //       gearbox_type: this.orderModel.gearbox_type || ChestType.MANUAL,
  //       car_type: this.orderModel.car_type || '',
  //       price_per_day: this.orderModel.price_per_day || 0,
  //       tenant_id: this.orderModel.tenant_id || 0
  //     });
  //   }
  //
  //   if (this.details) {
  //     this.orderForm.disable();
  //   }
  // }
  //
  // saveOrder(): void {
  //   const car = { ...this.orderForm.getRawValue(), id: this.orderModel?.id } as OrderModel;
  //
  //   this.activeModal.close({ car });
  // }
}
