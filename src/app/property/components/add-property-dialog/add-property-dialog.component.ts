import { Component, OnDestroy } from '@angular/core';

import { SubSink } from 'subsink';
import { finalize } from 'rxjs/operators';

import { PropertyService } from '@app/property/services/property.service';
import { ModifyProperty } from '@app/property/interfaces/modify-property.interface';
import { Property } from '@app/property/models/property.model';
import { MatDialogRef } from '@angular/material/dialog';
import { UpdatePropertyDialogComponent } from '@app/property/components/update-property-dialog/update-property-dialog.component';

@Component({
  selector: 'app-add-property-dialog',
  templateUrl: './add-property-dialog.component.html',
  styleUrls: ['./add-property-dialog.component.scss']
})
export class AddPropertyDialogComponent implements OnDestroy {
  public isFormSubmitting: boolean = false;

  private subs = new SubSink();

  constructor(private dialogRef: MatDialogRef<UpdatePropertyDialogComponent>,
              private propertyService: PropertyService) {}

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  public onMessageFormSubmitted(property: ModifyProperty): void {
    this.isFormSubmitting = true;

    this.subs.sink = this.propertyService.addProperty(property)
      .pipe(
        finalize(() => this.isFormSubmitting = false)
      )
      .subscribe((addedProperty: Property) => {
      this.dialogRef.close();
    });
  }

}
