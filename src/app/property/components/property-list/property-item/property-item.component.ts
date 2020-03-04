import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Property } from '@app/property/models/property.model';

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyItemComponent {
  @Input() property: Property;
  @Input() isActionButtonsDisabled: boolean = false;

  @Output() updateButtonClicked: EventEmitter<Property> = new EventEmitter<Property>();
  @Output() removeButtonClicked: EventEmitter<number> = new EventEmitter<number>();

}
