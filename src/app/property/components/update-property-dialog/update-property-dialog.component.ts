import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-property-dialog',
  templateUrl: './update-property-dialog.component.html',
  styleUrls: ['./update-property-dialog.component.scss']
})
export class UpdatePropertyDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

}
