import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Employee } from '../../employee';
import { EmployeeService } from '../../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EditEmployeeComponent } from "../edit-employee/edit-employee.component";
import { AddEmployeeComponent } from "../add-employee/add-employee.component";
import { DeleteEmployeeComponent } from "../delete-employee/delete-employee.component";

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule, EditEmployeeComponent, AddEmployeeComponent, DeleteEmployeeComponent],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  public employees: Employee[] = [];
  public employeeObject: Employee | null = null;

  constructor(private employeeService: EmployeeService) {
  }
  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      button.setAttribute('data-target', '#editEmployeeModal');
      this.employeeObject = employee;
    }
    if (mode === 'delete') {
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
