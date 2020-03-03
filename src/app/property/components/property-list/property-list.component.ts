import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { filter } from 'rxjs/operators';

import { PropertyService } from '@app/property/services/property.service';
import { Property } from '@app/property/interfaces/property.interface';
import { AreYouSureDialogComponent } from '@shared/components/are-you-sure-dialog/are-you-sure-dialog.component';
import { AreYouSureDialogData } from '@shared/interfaces/are-you-sure-dialog-data.interface';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit, OnDestroy {
  public properties$: Observable<Property[]>;

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

  }

  public onUpdateButtonClicked(propertyId: number): void {

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
    this.propertyService.removeProperty(propertyId);
  }

  private getAreYouSureDialogData(): AreYouSureDialogData {
    return {
      submitButtonText: 'delete'
    };
  }

}
