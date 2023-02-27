import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ClientModel } from '../../model/client-model';
import { FormControl, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
  templateUrl: './client-edit-modal.component.html',
  styles: [`.modal-body { max-height: 70vh; overflow-y: scroll; }`]
})
export class ClientEditModalComponent {

  clientModel?: ClientModel;
  details = false;

  clientForm = this.fb.group({
    firstname: ['', [Validators.required]],
    surname: ['', [Validators.required]],
    age: [0, [Validators.required]],
    driver_license_number: ['', [Validators.required]],
    street: ['', [Validators.required]],
    house_number: [''],
    city: ['', [Validators.required]],
    post_code: ['', [Validators.required]]
  });

  constructor(private readonly activeModal: NgbActiveModal, private readonly fb: NonNullableFormBuilder) {
  }

  static open(ngbModal: NgbModal, clientModel?: ClientModel, details?: boolean): NgbModalRef {
    const modal = ngbModal.open(ClientEditModalComponent, {
      centered: true
    });

    modal.componentInstance.clientModel = clientModel;
    modal.componentInstance.details = details;

    return modal;
  }

  get firstnameControl(): FormControl<string> {
    return this.clientForm.controls.firstname;
  }

  get surnameControl(): FormControl<string> {
    return this.clientForm.controls.surname;
  }
  get ageControl(): FormControl<number> {
    return this.clientForm.controls.age;
  }

  get driver_license_numberControl(): FormControl<string> {
    return this.clientForm.controls.driver_license_number;
  }

  get streetControl(): FormControl<string> {
    return this.clientForm.controls.street;
  }
  get house_numberControl(): FormControl<string> {
    return this.clientForm.controls.house_number;
  }

  get cityControl(): FormControl<string> {
    return this.clientForm.controls.city;
  }

  get post_codeControl(): FormControl<string> {
    return this.clientForm.controls.post_code;
  }

  ngOnInit(): void {
    this.initForm();
  }

  onDismiss(): void {
    this.activeModal.close();
  }

  private initForm(): void {
    if (this.clientModel) {
      this.clientForm.patchValue({
        firstname: this.clientModel.firstname || '',
        surname: this.clientModel.surname || '',
        age: this.clientModel.age || 0,
        driver_license_number: this.clientModel.driver_license_number || '',
        street: this.clientModel.street || '',
        house_number: this.clientModel.house_number || '',
        city: this.clientModel.city || '',
        post_code: this.clientModel.post_code || ''
      });
    }

    if (this.details) {
      this.clientForm.disable();
    }
  }

  saveClient(): void {
    const client = { ...this.clientForm.getRawValue(), id: this.clientModel?.id } as ClientModel;

    this.activeModal.close({ client });
  }
}
