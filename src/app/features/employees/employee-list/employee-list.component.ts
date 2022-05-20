import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { Office } from 'src/app/models/office.model';
import { AddEditEmpoyeeComponent } from '../add-edit-empoyee/add-edit-empoyee.component';
import { delay, finalize } from 'rxjs/operators';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  public employees: MatTableDataSource<Employee>;
  public offices: Office[] = [];
  public allTags: string[] = [];
  public tagCtrl = new FormControl();
  public isLoading$ = new BehaviorSubject<boolean>(false);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('tagInput') fruitInput: ElementRef<HTMLInputElement>;

  public displayedColumns: string[] = [
    'fullname',
    'office',
    'birthdate',
    'phonenumber',
    'tags',
    'actions',
  ];

  constructor(
    public emplService: EmployeesService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
  ) { }

  public ngOnInit(): void {
    this.getDataForTable();
  }

  public removeTag(tag: string, employee: Employee) {
    employee.tags = employee.tags.filter(tagItem => tagItem !== tag);
    this.updateEmployee(employee);
  }

  public addTag(event, employee: Employee): void {
    const newTag: string = event.target.value;

    if (!employee.tags.some(tagItem => tagItem === newTag) && newTag !== '') {
      employee.tags.push(newTag);
      this.updateEmployee(employee);
    }
  }

  public createNewEmployee(): void {
    this.openDialog();
  }

  public editEmployee(empoyee: Employee): void {
    this.openDialog(empoyee);
  }

  public deleteEmployee(employee: Employee): void {
    this.emplService.deleteEmployee(employee.id).subscribe(
      () => {
        this.notificationService.success('Employee was deleted', 'Success');
      },
      () => {
        this.notificationService.warn('Something\'s wrong on deleting employee', 'Fail');
      });

    this.getDataForTable();
  }

  private getDataForTable(): void {
    this.isLoading$.next(true);
    combineLatest([
      this.emplService.getEmployees(),
      this.emplService.getOffices()
    ]).pipe(
      delay(500),
      finalize(() => { this.isLoading$.next(false); }),
    ).subscribe(([employees, offices]: [Employee[], Office[]]) => {
      this.employees = new MatTableDataSource(employees);
      this.employees.sort = this.sort;
      this.employees.paginator = this.paginator;

      this.offices = offices;

      employees.forEach(employeeItem => {
        this.allTags.push(...employeeItem.tags);
        this.allTags = this.allTags.filter(function (elem, index, self) {
          return index === self.indexOf(elem);
        });
      })
    })
  }

  private addNewEmployee(employee: Employee): void {
    this.emplService.addNewEmployee(employee).subscribe(
      (response: Employee) => {
        this.notificationService.success('Employee was created', 'Success');
      },
      () => {
        this.notificationService.warn('Something\'s wrong on adding new employee', 'Fail');
      });

    this.getDataForTable();
  }

  private updateEmployee(employee: Employee): void {
    this.emplService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        this.notificationService.success('Employee was changed', 'Success');
      },
      () => {
        this.notificationService.warn('Something\'s wrong on editing employee', 'Fail');
      });
  }

  private openDialog(empoyee?: Employee): void {
    const dialogRef = this.dialog.open(AddEditEmpoyeeComponent, {
      width: '250px',
      data: {
        offices: this.offices,
        allTags: this.allTags,
        employee: empoyee || undefined,
      },
    });

    dialogRef.afterClosed().subscribe(empoyeeResult => {
      if (empoyeeResult && empoyeeResult.id) {
        this.updateEmployee(empoyeeResult);
      }

      if (empoyeeResult && !empoyeeResult.id) {
        this.addNewEmployee(empoyeeResult);
      }
    });
  }
}
