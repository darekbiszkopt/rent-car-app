import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClientCriteria, ClientService } from './client.service';
import { filter, finalize, Observable, take } from 'rxjs';
import { ClientModel } from './model/client-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { UpdateClientResponse } from './model/update-client-response';
import { Pagination } from '../../shared/util/request-util';
import { NgxSpinnerService } from 'ngx-spinner';
import { ClientResponse } from './model/client-response';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';
import { ClientEditModalComponent } from './components/client-edit-modal/client-edit-modal.component';

@Component({
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  faSort = faSort;
  totalElements: number;
  clients: ClientModel[] = [];
  predicate = 'id';
  ascending = true;
  showSearchBox = true;
  page = 0;
  limit = 10;
  offset = 0;
  dir = 'DESC';

  clientSearchForm = this.fb.group({
    firstname: '',
    surname: '',
    age: null,
    driver_license_number: '',
    city:  '',
    post_code:  '',
  });

  constructor(private readonly clientService: ClientService, private readonly cdRef: ChangeDetectorRef,
              private readonly modal: NgbModal, private readonly tokenService: TokenStorageService,
              private readonly spinner: NgxSpinnerService, private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loadAll();
  }

  isNextPageDisabled(): boolean {
    return this.totalElements < (this.page + 1) * this.limit;
  }

  deleteClient($event: number): void {

    const deleteId = $event;

    const modal = ConfirmDialogComponent.open(this.modal, 'cancel.client');

    modal.closed
      .pipe(take(1),
        filter((res) => res))
      .subscribe({ next: () => this.confirmDeleteClient(deleteId) });
  }

  detailsClient(client: ClientModel): void {
    this.updateClient(client, true);
  }

  updateClient(client?: ClientModel, details = false): void {
    const modal = ClientEditModalComponent.open(this.modal, client, details);

    modal.closed
      .pipe(take(1),
        filter((res) => !!res))
      .subscribe({ next: ({ client }) => this.saveClient(client) });
  }


  reload(): void {
    this.spinner.show().then(() => this.loadAll(true));
  }

  reset(): void {
    this.spinner.show().then(() => {
      this.clientSearchForm.reset();
      this.clear();
      this.loadAll();
    });
  }

  previousPage(): void {
    this.spinner.show().then(() => {
      this.page = --this.page;
      this.offset = this.page * this.limit;
      this.loadAll();
    });
  }

  nextPage(nextPage?: number): void {
    this.spinner.show().then(() => {
      this.page = !nextPage ? ++this.page : this.page + 2;
      this.offset = this.page * this.limit;
      this.loadAll();
    });
  }

  search(): void {
    this.spinner.show().then(() => {
      this.loadAll(true);
    });
  }

  toggleSearchBox(): void {
    this.showSearchBox = !this.showSearchBox;
    if (!this.showSearchBox) {
      this.spinner.show().then(() => this.reset());
    }
  }

  private confirmDeleteClient(id: number): void {
    this.clientService.deleteClient(id)
      .pipe(filter((res) => res.success))
      .subscribe({
        next: () => this.loadAll()
      });
  }

  private saveClient(req: ClientModel): void {
    let observable: Observable<UpdateClientResponse> = req?.id ? this.clientService.updateClient(req) : this.clientService.createClient(req);
    observable
      .pipe(filter((res) => res.success))
      .subscribe({
        next: () => this.loadAll()
      });
  }

 private loadAll(isClear = false): void {
    if (isClear) {
      this.clear();
    }

    const clientCriteria = { ...this.clientSearchForm.value } as ClientCriteria;

    const page = {
      limit: this.limit,
      offset: this.offset,
      sort: this.predicate,
      dir: this.ascending ? 'DESC' : 'ASC'
    } as Pagination;

    this.clientService.getAllClient(clientCriteria, page)
      .pipe(
        filter((res) => res.success),
        finalize(() => this.cdRef.detectChanges())
      )
      .subscribe({
        next: (res) => this.paginateClients(res),
        error: () => this.spinner.hide()
      });
  }

  private clear(): void {
    this.page = 0;
    this.clients = [];
  }

  private paginateClients(clientsResponse: ClientResponse): void {
    this.totalElements = clientsResponse.count;
    if (clientsResponse.data) {
      this.clients = clientsResponse.data;
    }
    this.spinner.hide();
  }
}
