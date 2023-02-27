import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { slideInAnimation } from '../../../../animations';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-order-filter',
  templateUrl: './order-filter.component.html',
  styleUrls: ['./order-filter.component.scss', '../../../../../assets/scss/search.scss'],
  animations: slideInAnimation,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderFilterComponent {
  // TODO
  @Input() orderSearchForm!: FormGroup;
  @Input() showSearchBox = false;

  @Output() close: EventEmitter<any> = new EventEmitter();
  @Output() reset: EventEmitter<any> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();

  resetV(): void {
    this.reset.emit();
  }

  closeV(): void {
    this.close.emit();
  }

  filter(): void  {
    this.search.emit();
  }
}
