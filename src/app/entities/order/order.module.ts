import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { RouterModule } from '@angular/router';
import { orderRoute } from './order.route';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { OrderEditModalComponent } from './components/client-edit-modal/order-edit-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { OrderFilterComponent } from './components/client-filter/order-filter.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    OrderComponent,
    OrderEditModalComponent,
    OrderFilterComponent
  ],
  imports: [
    RouterModule.forChild(orderRoute),
    CommonModule,
    MatButtonModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    TranslateModule,
    MatButtonToggleModule,
    FontAwesomeTestingModule,
    InfiniteScrollModule,
    MatSelectModule
  ]
})
export class OrderModule { }
