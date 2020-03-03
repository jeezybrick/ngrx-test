import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Property } from '@app/property/interfaces/property.interface';

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyItemComponent {
  @Input() property: Property;
  @Input() id: number = 1;
  @Input() title: string = 'Shiba Inu';
  @Input() description: string = 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.\n' +
    '      A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally\n' +
    '      bred for hunting.';

  @Output() updateButtonClicked: EventEmitter<Property> = new EventEmitter<Property>();
  @Output() removeButtonClicked: EventEmitter<number> = new EventEmitter<number>();

}
