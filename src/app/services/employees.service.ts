import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Employee } from "../models/employee.model";
import { environment } from "src/environments/environment";
import { Office } from "../models/office.model";

@Injectable({
    providedIn: 'root',
})
export class EmployeesService {
    constructor(private http: HttpClient) {
    }

    public getEmployees(): Observable<Employee[]> {
        return this.http.get<Employee[]>(`${environment.apiUrl}/employees`);
    }

    public addNewEmployee(employee: Employee): Observable<Employee> {
        return this.http.post<Employee>(`${environment.apiUrl}/employees`, employee);
    }

    public updateEmployee(employee: Employee): Observable<Employee> {
        return this.http.put<Employee>(`${environment.apiUrl}/employees/${employee.id}`, employee);
    }

    public deleteEmployee(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.apiUrl}/employees/${id}`);
    }

    public getOffices(): Observable<Office[]> {
        return this.http.get<Office[]>(`${environment.apiUrl}/offices`);
    }
}