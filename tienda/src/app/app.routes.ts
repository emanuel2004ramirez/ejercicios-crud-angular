import { Routes } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { ProductoComponentComponent } from './producto-component/producto-component.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponentComponent },
  { path: 'Producto', component: ProductoComponentComponent },
  { path: '**', redirectTo: 'login' },
];
