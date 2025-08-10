import { Component, Input } from '@angular/core';
import { Employee } from '../../employee';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {
  title = 'Edit Employee';
  @Input() employeeObject: Employee | null = null;

  public onUpdateEmployee(): void {
    // Logic to edit the employee will go here
    console.log('Editing employee:', this.employeeObject);
  }

  public onCloseModal(): void {
    this.employeeObject = null; // Reset the employee object
    console.log('Modal closed, employee object reset');
    // Additional logic to close the modal can be added here
  }
}
