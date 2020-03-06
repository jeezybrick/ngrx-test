import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { shareReplay, filter, take } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { ofType, Actions } from '@ngrx/effects';

import { ModifyProperty } from '@app/property/interfaces/modify-property.interface';
import { Property } from '@app/property/models/property.model';
import { updateProperty } from '@app/property/actions/property.actions';
import { getIsPropertyModifyProcess, getIsPropertyModified } from '@app/reducers';
import * as propertyActions from '../../actions/property.actions';

@Component({
  selector: 'app-update-property-dialog',
  templateUrl: './update-property-dialog.component.html',
  styleUrls: ['./update-property-dialog.component.scss']
})
export class UpdatePropertyDialogComponent implements OnInit, OnDestroy {
  public isFormSubmitting$: Observable<boolean>;

  private subs = new SubSink();

  constructor(
    private actions$: Actions,
    private dialogRef: MatDialogRef<UpdatePropertyDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Partial<Property>,
    private store: Store<any>,
  ) {}

  ngOnInit() {
    this.isFormSubmitting$ = this.store.select(getIsPropertyModifyProcess)
      .pipe(
        shareReplay(1)
      );

      this.subs.sink = this.actions$
      .pipe(
        ofType(propertyActions.addPropertySuccess),
        take(1)
      )
      .subscribe(() => {
        this.dialogRef.close();
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onMessageFormSubmitted(property: ModifyProperty): void {
    this.store.dispatch(updateProperty({
      propertyId: this.data.id,
      updatedFields: property
    }));

  }

}
