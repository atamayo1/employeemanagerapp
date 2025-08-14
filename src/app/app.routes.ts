import { Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'employee',
        component: LayoutComponent,
        children: [
            { path: 'all', component: EmployeeComponent }
        ]
    },
    { path: '**', redirectTo: 'login' }
];
