import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { OrderCriteria, OrderService } from './order.service';
import { filter, Observable, take } from 'rxjs';
import { OrderModel } from './model/order-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { TokenStorageService } from '../../shared/services/token-storage.service';
import { UpdateOrderResponse } from './model/update-order-response';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderResponse } from './model/order-response';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder } from '@angular/forms';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  // TODO
  faSort = faSort;
  totalElements: number;
  orders: OrderModel[] = [];
  predicate = 'id';
  ascending = true;
  showSearchBox = true;
  page = 0;
  limit = 10;
  offset = 0;
  dir = 'DESC';

  orderSearchForm = this.fb.group({
    id: null,
    client_surname: '',
    car_mark: '',
    is_paid: null,
    is_rent: null,
    is_returned: null,
    is_additional_insurance: null
  });

  constructor(private readonly orderService: OrderService, private readonly cdRef: ChangeDetectorRef,
              private readonly modal: NgbModal, private readonly tokenService: TokenStorageService,
              private readonly spinner: NgxSpinnerService, private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.loadAll();
  }

  deleteOrder($event: number): void {

    const deleteId = $event;

    const modal = ConfirmDialogComponent.open(this.modal, 'cancel.order');

    modal.closed
      .pipe(take(1),
        filter((res) => res))
      .subscribe({ next: () => this.confirmDeleteOrder(deleteId) });
  }

  detailsOrder(order: OrderModel): void {
    this.updateOrder(order, true);
  }

  updateOrder(order?: OrderModel, details = false): void {
    // const modal = OrderEditModalComponent.open(this.modal, order, details);
    //
    // modal.closed
    //   .pipe(take(1),
    //     filter((res) => !!res))
    //   .subscribe({ next: ({ order }) => this.saveOrder(order) });
  }

  private confirmDeleteOrder(id: number): void {
    this.orderService.deleteOrder(id)
      .pipe(filter((res) => res.success))
      .subscribe({
        next: () => this.loadAll()
      });
  }

  private saveOrder(req: OrderModel): void {
    let observable: Observable<UpdateOrderResponse> = req?.id ? this.orderService.updateOrder(req) : this.orderService.createOrder(req);
    observable
      .pipe(filter((res) => res.success))
      .subscribe({
        next: () => this.loadAll()
      });
  }

  loadAll(isClear = false): void {
    // if (isClear) {
    //   this.clear();
    // }
    //
    // const orderCriteria = { ...this.orderSearchForm.value } as OrderCriteria;
    //
    // const page = {
    //   limit: this.limit,
    //   offset: this.offset,
    //   sort: this.predicate,
    //   dir: this.ascending ? 'DESC' : 'ASC'
    // } as Pagination;
    //
    // this.orderService.getAllOrder(orderCriteria, page)
    //   .pipe(
    //     filter((res) => res.success),
    //     finalize(() => this.cdRef.detectChanges())
    //   )
    //   .subscribe({
    //     next: (res) => this.paginateOrders(res),
    //     error: () => this.spinner.hide()
    //   });
    this.spinner.hide()
  }

  reload(): void {
    this.spinner.show().then(() => this.loadAll(true));
  }

  reset(): void {
    this.spinner.show().then(() => {
      this.orderSearchForm.reset();
      this.clear();
      this.loadAll();
    });
  }

  clear(): void {
    this.page = 0;
    this.orders = [];
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

  private paginateOrders(ordersResponse: OrderResponse): void {
    this.totalElements = ordersResponse.count;
    if (ordersResponse.data) {
      this.orders = ordersResponse.data;
    }
    this.spinner.hide();
  }

  isNextPageDisabled(): boolean {
    return this.totalElements < (this.page + 1) * this.limit;
  }
}
