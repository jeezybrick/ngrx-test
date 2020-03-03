import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';

import { SidenavComponent } from '@shared/components/sidenav/sidenav.component';
import { AreYouSureDialogComponent } from '@shared/components/are-you-sure-dialog/are-you-sure-dialog.component';

@NgModule({
  declarations: [
    SidenavComponent,
    AreYouSureDialogComponent
  ],
  imports: [
    CommonModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ],
  exports: [
    SidenavComponent,
    AreYouSureDialogComponent
  ],
  entryComponents: [AreYouSureDialogComponent]
})
export class SharedModule { }