import { Component } from '@angular/core';
import { EmployeeSearchService } from '../../employee-search.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  searchTerm = '';
  username = '';

  constructor(private employeeSearchService: EmployeeSearchService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.username = String(this.authService.getUsername());
  }

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

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
