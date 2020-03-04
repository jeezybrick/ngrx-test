import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@shared/shared.module';
import { PropertyRoutingModule } from '@app/property/property-routing.module';
import { PropertyListComponent } from '@app/property/components/property-list/property-list.component';
import { PropertyItemComponent } from '@app/property/components/property-list/property-item/property-item.component';
import { AddPropertyDialogComponent } from '@app/property/components/add-property-dialog/add-property-dialog.component';
import { UpdatePropertyDialogComponent } from '@app/property/components/update-property-dialog/update-property-dialog.component';
import { ModifyPropertyFormComponent } from '@app/property/components/modify-property-form/modify-property-form.component';
import { PropertyEffects } from '@app/property/effects/movie.effects';

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
    EffectsModule.forFeature([PropertyEffects]),
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule
  ],
  entryComponents: [AddPropertyDialogComponent, UpdatePropertyDialogComponent]
})
export class PropertyModule {
}
