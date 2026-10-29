import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LibroComponent } from './libro/libro.component';



export const routes: Routes = [
    {path:  'login', component: LoginComponent},
    {path: 'libro', component: LibroComponent},
    {path: '', redirectTo: '', pathMatch: 'full'},
    {path: '**', redirectTo: 'Login'}

];
