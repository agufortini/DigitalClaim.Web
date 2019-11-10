import { NgModule } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule, MatStepperModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
    imports: [
        MatPaginatorModule
    ],
    exports: [
        MatSelectModule,
        MatInputModule,
        MatTableModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatTooltipModule,
        MatExpansionModule,
        MatIconModule,
        MatCheckboxModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatStepperModule
    ],
    providers: [
        MatDatepickerModule
    ]
})
export class AngularMaterialModule {}
