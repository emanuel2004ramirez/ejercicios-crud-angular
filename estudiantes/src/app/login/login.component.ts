import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  usuario: string = '';
  clave: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.usuario === 'registro' && this.clave === 'alumnos123') {
      this.router.navigate(['/estudiante']);
      localStorage.setItem('sesionEstudiante', 'si');
    } else {
      alert('Usuario o clave incorrectos');
    }
  }

}
