import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TareasComponent } from './tareas/tareas.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'tareas', component: TareasComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
];
