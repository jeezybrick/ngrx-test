import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-property-dialog',
  templateUrl: './add-property-dialog.component.html',
  styleUrls: ['./add-property-dialog.component.scss']
})
export class AddPropertyDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}

}
