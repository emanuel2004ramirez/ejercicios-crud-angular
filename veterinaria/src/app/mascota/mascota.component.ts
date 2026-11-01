import { Component } from '@angular/core';
import { FormsModule   } from '@angular/forms';
import { Router } from '@angular/router';
//clase
interface Mascota {
  id: number;
  nombre:string;
  especie: string;
  edad: number;
  propietario: string;

}



@Component({
  imports: [FormsModule],
  selector: 'app-mascota',
  styleUrl: './mascota.component.css',
  templateUrl: './mascota.component.html',
})
export class MascotaComponent {

  //inicializar todo
constructor(private router: Router){}
mascotas: Mascota[] = [];
nombre: string = '';
especie: string = '' ;
edad: number = 0;
propietario: string = '';

ngOnInit(){
  if (!localStorage.getItem('sesionVeterinaria')){
    this.router.navigate(['/login'])
    return;
  }

  //llam
  this.ReadMascotas();

}

ReadMascotas(){
  const mascotasGuardadas = localStorage.getItem('registrosEstudiantes');
  if(mascotasGuardadas){
    this.mascotas = JSON.parse(mascotasGuardadas);
  }
}



}
