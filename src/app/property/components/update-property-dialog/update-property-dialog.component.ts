import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { SubSink } from 'subsink';
import { finalize } from 'rxjs/operators';

import { ModifyProperty } from '@app/property/interfaces/modify-property.interface';
import { PropertyService } from '@app/property/services/property.service';
import { Property } from '@app/property/models/property.model';

@Component({
  selector: 'app-update-property-dialog',
  templateUrl: './update-property-dialog.component.html',
  styleUrls: ['./update-property-dialog.component.scss']
})
export class UpdatePropertyDialogComponent implements OnDestroy {
  public isFormSubmitting: boolean = false;

  private subs = new SubSink();

  constructor(
    public dialogRef: MatDialogRef<UpdatePropertyDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Partial<Property>,
    private propertyService: PropertyService
  ) {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onMessageFormSubmitted(property: ModifyProperty): void {
    this.isFormSubmitting = true;

    this.subs.sink = this.propertyService.updateProperty(this.data.id, property)
      .pipe(
        finalize(() => this.isFormSubmitting = false)
      ).subscribe((updatedProperty: Property) => {
        this.dialogRef.close();
      });
  }

}
