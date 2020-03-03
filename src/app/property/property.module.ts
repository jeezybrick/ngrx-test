import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { SharedModule } from '@shared/shared.module';
import { PropertyRoutingModule } from '@app/property/property-routing.module';
import { PropertyListComponent } from '@app/property/components/property-list/property-list.component';
import { PropertyItemComponent } from '@app/property/components/property-list/property-item/property-item.component';
import { AddPropertyDialogComponent } from '@app/property/components/add-property-dialog/add-property-dialog.component';
import { UpdatePropertyDialogComponent } from '@app/property/components/update-property-dialog/update-property-dialog.component';
import { ModifyPropertyFormComponent } from '@app/property/components/modify-property-form/modify-property-form.component';

@NgModule({
  declarations: [
    PropertyListComponent,
    PropertyItemComponent,
    AddPropertyDialogComponent,
    UpdatePropertyDialogComponent,
    ModifyPropertyFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PropertyRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [AddPropertyDialogComponent, UpdatePropertyDialogComponent]
})
export class PropertyModule {
}
