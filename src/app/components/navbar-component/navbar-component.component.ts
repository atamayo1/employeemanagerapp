import { Component } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { EmployeeSearchService } from '../../employee-search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar-component.component.html',
  styleUrl: './navbar-component.component.css'
})
export class NavbarComponentComponent {
  searchTerm = '';

  constructor(private employeeSearchService: EmployeeSearchService) { }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
    this.employeeSearchService.setSearchTerm(this.searchTerm.trim());
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.employeeSearchService.setSearchTerm('');
  }

  onSubmit(event: Event): void {
    event.preventDefault();
  }
}
