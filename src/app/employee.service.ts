import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiServeUrl = '';

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServeUrl}/employee/all`);
  }

  public addEmployees(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServeUrl}/employee/add`, employee);
  }

  public deleteEmployees(employeeId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServeUrl}/employee/${employeeId}`);
  }
}
