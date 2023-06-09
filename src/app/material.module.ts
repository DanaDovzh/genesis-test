import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  exports: [
    MatGridListModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,
    MatChipsModule,
    MatDialogModule,
  ],
})
export class MaterialModule {}
