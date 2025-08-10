import { Component, EventEmitter, Output } from '@angular/core';
import { Employee } from '../../employee';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {
  title = 'Add Employee';
  employee!: Employee;
  @Output() employeeSaved = new EventEmitter<void>();

  constructor(private employeeService: EmployeeService) {
  }

  onAddEmployee(emp: NgForm): void {
    // Logic to add the employee will go here
    this.employeeService.addEmployees(emp.value).subscribe(
      response => {
        console.log('Employee added successfully:', response);
        this.employeeSaved.emit();
      },
      error => {
        console.error('Error adding employee:', error);
      }
    );
  }
}
