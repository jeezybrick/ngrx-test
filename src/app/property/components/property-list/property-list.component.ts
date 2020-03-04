import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';

import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { filter, finalize } from 'rxjs/operators';

import { PropertyService } from '@app/property/services/property.service';
import { Property } from '@app/property/models/property.model';
import { AreYouSureDialogComponent } from '@shared/components/are-you-sure-dialog/are-you-sure-dialog.component';
import { AreYouSureDialogData } from '@shared/interfaces/are-you-sure-dialog-data.interface';
import { AddPropertyDialogComponent } from '@app/property/components/add-property-dialog/add-property-dialog.component';
import { UpdatePropertyDialogComponent } from '@app/property/components/update-property-dialog/update-property-dialog.component';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  public properties$: Observable<Property[]>;
  public isRemovingProcess: Map<number, boolean> = new Map<number, boolean>();

  private subs = new SubSink();

  constructor(
    private dialog: MatDialog,
    private propertyService: PropertyService
  ) {
  }

  ngOnInit(): void {
    this.properties$ = this.propertyService.getProperties();
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
    this.isRemovingProcess.set(propertyId, true);

    this.subs.sink = this.propertyService.removeProperty(propertyId)
      .pipe(
        finalize(() => this.isRemovingProcess.set(propertyId, false))
      )
      .subscribe();
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
