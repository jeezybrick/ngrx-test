import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { shareReplay, filter, take } from 'rxjs/operators';
import { SubSink } from 'subsink';
import { Actions, ofType } from '@ngrx/effects';

import { ModifyProperty } from '@app/property/interfaces/modify-property.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { UpdatePropertyDialogComponent } from '@app/property/components/update-property-dialog/update-property-dialog.component';
import { addProperty } from '@app/property/actions/property.actions';
import { getIsPropertyModifyProcess, getIsPropertyModified } from '@app/reducers';
import * as propertyActions from '../../actions/property.actions';

@Component({
  selector: 'app-add-property-dialog',
  templateUrl: './add-property-dialog.component.html',
  styleUrls: ['./add-property-dialog.component.scss']
})
export class AddPropertyDialogComponent implements OnInit, OnDestroy {
  public isFormSubmitting$: Observable<boolean>;

  private subs = new SubSink();

  constructor(private actions$: Actions,
              private dialogRef: MatDialogRef<UpdatePropertyDialogComponent>,
              private store: Store<any>) {}

  ngOnInit(): void {
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
    this.store.dispatch(addProperty({property}));
  }

}
