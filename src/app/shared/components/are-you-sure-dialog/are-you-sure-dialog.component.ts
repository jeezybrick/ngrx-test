import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AreYouSureDialogData } from '@shared/interfaces/are-you-sure-dialog-data.interface';

@Component({
  selector: 'app-are-you-sure-dialog',
  templateUrl: './are-you-sure-dialog.component.html',
  styleUrls: ['./are-you-sure-dialog.component.scss']
})
export class AreYouSureDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: AreYouSureDialogData
  ) {}
}
