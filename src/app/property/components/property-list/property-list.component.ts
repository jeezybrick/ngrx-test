import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';

import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Property } from '@app/property/models/property.model';
import { AreYouSureDialogComponent } from '@shared/components/are-you-sure-dialog/are-you-sure-dialog.component';
import { AreYouSureDialogData } from '@shared/interfaces/are-you-sure-dialog-data.interface';
import { AddPropertyDialogComponent } from '@app/property/components/add-property-dialog/add-property-dialog.component';
import { UpdatePropertyDialogComponent } from '@app/property/components/update-property-dialog/update-property-dialog.component';
import { getIsPropertiesLoading, getProperties } from '@app/reducers';
import { loadProperties, removeProperty } from '@app/property/actions/property.actions';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  public properties$: Observable<Property[]>;
  public isPropertiesLoading$: Observable<boolean>;
  public isRemovingProcess: Map<number, boolean> = new Map<number, boolean>();

  private subs = new SubSink();

  constructor(
    private dialog: MatDialog,
    private store: Store<any>
  ) {
  }

  ngOnInit(): void {
    this.properties$ = this.store.select(getProperties);
    this.isPropertiesLoading$ = this.store.select(getIsPropertiesLoading);

    this.store.dispatch(loadProperties());
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public onAddButtonClicked(): void {
    this.dialog.open(
      AddPropertyDialogComponent, this.getModifyPropertiesDialogConfig()
    );
  }

  public onUpdateButtonClicked(property: Property): void {
    this.dialog.open(
      UpdatePropertyDialogComponent, this.getModifyPropertiesDialogConfig({...property})
    );
  }

  public onRemoveButtonClicked(propertyId: number): void {
    this.subs.sink = this.dialog.open(
      AreYouSureDialogComponent,
      {
        data: this.getAreYouSureDialogData()
      }
    ).afterClosed()
      .pipe(
        filter((result: boolean) => result)
      )
      .subscribe(() => {
        this.removeProperty(propertyId);
      });
  }

  private removeProperty(propertyId: number): void {
    this.store.dispatch(removeProperty({propertyId}));
  }

  private getAreYouSureDialogData(): AreYouSureDialogData {
    return {
      submitButtonText: 'delete'
    };
  }

  private getModifyPropertiesDialogConfig(data: Partial<Property> | null = null): MatDialogConfig {
    return {
      disableClose: true,
      minWidth: '400px',
      data
    };
  }

}
