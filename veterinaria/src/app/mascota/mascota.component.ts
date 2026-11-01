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

//READ

ReadMascotas(){
  const mascotasGuardadas = localStorage.getItem('registrosMascotas');
  if(mascotasGuardadas){
    this.mascotas = JSON.parse(mascotasGuardadas);
  }
}

//CREATE
create(){
  if(!this.nombre.trim() || !this.especie.trim() || this.edad < 0 || !this.propietario.trim()){
    alert('Por favor igresar los campos correctamente')
    return;
  }
  //Generar id
  const id = this.mascotas.length + 1;

  //Agregar nueva mascota
  this.mascotas.push({
    id,
    nombre: this.nombre,
    especie: this.especie,
    edad: this.edad,
    propietario: this.propietario
  })

  localStorage.setItem('registrosMascotas', JSON.stringify(this.mascotas));
  this.limpiar();

}
//UPDATE
//DELETE

//Limpiar
limpiar(){

this.nombre = '';
this.especie = '' ;
this.edad = 0;
this.propietario = '';


}


}
