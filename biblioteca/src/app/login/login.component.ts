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
  password: string = '';

  constructor(private router: Router) {}

  iniciarSesion() {
    
    if (this.usuario === 'bibliotecario' && this.password === 'biblio123') {


      localStorage.setItem('sesionBiblioteca', 'si' );
      this.router.navigate(['/libro']);
    } else {
      alert('Usuario o contraseña incorrectos');
    }
  }



}
