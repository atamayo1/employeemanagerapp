import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { Employee } from '../../employee';

@Component({
  selector: 'app-delete-employee',
  standalone: true,
  imports: [],
  templateUrl: './delete-employee.component.html',
  styleUrl: './delete-employee.component.css'
})
export class DeleteEmployeeComponent {
  title = 'Delete Employee';
  employee: Employee | null = null;

  @Input() set employeeObject(value: Employee | null) {
    this.employee = value ? { ...value } : null;
  }

  @Output() employeeUpdated = new EventEmitter<void>();

  constructor(private employeeService: EmployeeService) {
  }

  onDeleteEmployee(id: number | undefined): void {
    if (id) {
      this.employeeService.deleteEmployeeById(id).subscribe(
        response => {
          console.log('Employee deleted successfully:', response);
          this.employeeUpdated.emit();
        },
        error => {
          console.error('Error deleting employee:', error);
        }
      );
    } else {
      console.error('No employee to delete');
    }
  }

  get employeeName(): string | undefined {
    return this.employee?.name;
  }

  get employeeId(): number | undefined {
    return this.employee?.id;
  }
}
