import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from "src/app/shared/shared.module";
import { AddEditEmpoyeeComponent } from './add-edit-empoyee/add-edit-empoyee.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatChipsModule } from "@angular/material/chips";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatNativeDateModule } from "@angular/material/core";

@NgModule({
    declarations: [
    EmployeeListComponent,
    AddEditEmpoyeeComponent,
  ],
    imports: [
      EmployeesRoutingModule,
      CommonModule,
      HttpClientModule,
      MatButtonModule,
      MatChipsModule,
      MatDatepickerModule,
      MatDialogModule,
      MatIconModule,
      MatInputModule,
      MatPaginatorModule,
      MatSelectModule,
      MatSortModule,
      MatTableModule,
      MatNativeDateModule,
      SharedModule,
      ReactiveFormsModule,
    ],
})
export class EmployeesModule {

}