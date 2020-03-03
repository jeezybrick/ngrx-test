import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-property-item',
  templateUrl: './property-item.component.html',
  styleUrls: ['./property-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PropertyItemComponent {
  @Input() id: number = 1;
  @Input() title: string = 'Shiba Inu';
  @Input() description: string = 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan.\n' +
    '      A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally\n' +
    '      bred for hunting.';

  @Output() updateButtonClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() removeButtonClicked: EventEmitter<number> = new EventEmitter<number>();

}
