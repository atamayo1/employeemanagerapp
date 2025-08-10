import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../employee';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {
  title = 'Edit Employee';
  employee: Employee | null = null;

  @Input() set employeeObject(value: Employee | null) {
    this.employee = value ? { ...value } : null;
  }

  @Output() employeeUpdated = new EventEmitter<void>();

  constructor(private employeeService: EmployeeService) {
  }

  public onUpdateEmployee(emp: Employee): void {
    // Logic to edit the employee will go here
    console.log('Editing employee:', emp);
    // This is where you would typically call a service to update the employee
    // For now, we just log the employee object to the console
    this.employeeService.updateEmployees(emp).subscribe(
      response => {
        console.log('Employee updated successfully:', response);
        this.employeeUpdated.emit();
      },
      error => {
        console.error('Error updating employee:', error);
      }
    );
  }
}
