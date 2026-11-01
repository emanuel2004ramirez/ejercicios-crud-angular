import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  imports: [FormsModule],
  selector: 'app-login',
  styleUrl: './login.component.css',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  usuario: string = '';
  clave: string = '';

  constructor(private router: Router){}

  iniciarSesion(){

    if(  this.usuario === 'veterinario' && this.clave === 'mascotas123'){
      this.router.navigate(['/mascota']);
      localStorage.setItem('sesionVeterinaria', 'si');


    } else {

      alert('Usuario o clave incorrecta');
    }

    


  }


}
