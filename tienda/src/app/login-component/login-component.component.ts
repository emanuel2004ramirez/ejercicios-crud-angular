import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login-component',
  styleUrl: './login-component.component.css',
  templateUrl: './login-component.component.html',
})
export class LoginComponentComponent {
  usuario: string = '';
  clave: string = '';
  

  constructor(private router: Router) {}

  iniciarSesion() {
    if (this.usuario === 'vendedor' && this.clave === 'tienda123') {
      localStorage.setItem('sesionTienda', 'si');
      this.router.navigate(['/Producto']);
    } else {
      alert('Usuario o clave incorrectos');
    }
  }

}
