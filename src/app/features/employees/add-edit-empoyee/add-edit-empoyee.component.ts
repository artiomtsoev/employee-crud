import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Employee } from 'src/app/models/employee.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Office } from 'src/app/models/office.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-empoyee',
  templateUrl: './add-edit-empoyee.component.html',
  styleUrls: ['./add-edit-empoyee.component.scss']
})
export class AddEditEmpoyeeComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddEditEmpoyeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { offices: Office[], allTags: string[], employee: Employee },
    public employeeService: EmployeesService,
    private toastr: ToastrService,
  ) {
    this.initializeForm();
  }

  public ngOnInit(): void {
    if (this.data?.employee) {
     this.initializeForm(this.data.employee);
    }
  }

  public createEmployee(): void {
    if (this.form.valid) {
      const employee: Employee = {
        id: this.data.employee?.id || undefined,
        fullname: this.form.get('fullname').value,
        birthdate: this.form.get('birthdate').value,
        office: this.form.get('office').value,
        phonenumber: this.form.get('phonenumber').value,
        tags: this.form.get('tags').value,
      };

      this.dialogRef.close(employee)
    } else {
      this.toastr.error('Failed to save employee');
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private initializeForm(employee?: Employee): void {
    this.form = new FormGroup({
      fullname: new FormControl(employee?.fullname || '', [Validators.required]),
      office: new FormControl(employee?.office || '', [Validators.required]),
      birthdate: new FormControl(employee?.birthdate || '', [Validators.required]),
      phonenumber: new FormControl(employee?.phonenumber || '', [Validators.required]),
      tags: new FormControl(employee?.tags || ''),
    });
  }
}
