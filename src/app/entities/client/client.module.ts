import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { RouterModule } from '@angular/router';
import { clientRoute } from './client.route';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../shared/shared.module';
import { ClientEditModalComponent } from './components/client-edit-modal/client-edit-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { ClientFilterComponent } from './components/client-filter/client-filter.component';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ClientComponent,
    ClientEditModalComponent,
    ClientFilterComponent
  ],
  imports: [
    RouterModule.forChild(clientRoute),
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
export class ClientModule { }
