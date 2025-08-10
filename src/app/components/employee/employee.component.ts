import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Employee } from '../../employee';
import { EmployeeService } from '../../employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { EditEmployeeComponent } from "../edit-employee/edit-employee.component";
import { AddEmployeeComponent } from "../add-employee/add-employee.component";
import { DeleteEmployeeComponent } from "../delete-employee/delete-employee.component";
import { EmployeeSearchService } from '../../employee-search.service';
import { Subscription } from 'rxjs';

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
  public filteredEmployees: Employee[] = [];
  private searchSubscription!: Subscription;

  constructor(private employeeService: EmployeeService, private employeeSearchService: EmployeeSearchService) {
  }

  ngOnInit(): void {
    this.getEmployees();

    this.searchSubscription = this.employeeSearchService.searchTerm$.subscribe(term => {
      this.filterEmployees(term);
    });
  }

  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  private filterEmployees(term: string): void {
    if (!term) {
      this.filteredEmployees = [...this.employees];
    } else {
      const lowerTerm = term.toLowerCase();
      this.filteredEmployees = this.employees.filter(emp =>
        emp.name.toLowerCase().includes(lowerTerm) ||
        emp.email.toLowerCase().includes(lowerTerm) ||
        emp.jobTitle.toLowerCase().includes(lowerTerm)
      );
    }
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        this.filteredEmployees = response;
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
      this.employeeObject = employee;
      button.setAttribute('data-target', '#editEmployeeModal');
    }
    if (mode === 'delete') {
      this.employeeObject = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
