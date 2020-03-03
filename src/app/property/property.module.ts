import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropertyListComponent } from './components/property-list/property-list.component';
import { SharedModule } from '../shared/shared.module';
import { PropertyRoutingModule } from './property-routing.module';
import { PropertyItemComponent } from './components/property-list/property-item/property-item.component';
import { AddPropertyDialogComponent } from './components/add-property-dialog/add-property-dialog.component';
import { UpdatePropertyDialogComponent } from './components/update-property-dialog/update-property-dialog.component';

@NgModule({
  declarations: [PropertyListComponent, PropertyItemComponent, AddPropertyDialogComponent, UpdatePropertyDialogComponent],
  imports: [
    CommonModule,
    SharedModule,
    PropertyRoutingModule
  ]
})
export class PropertyModule { }
