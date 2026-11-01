import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Estudiante {
  id: number;
  cuenta: string;
  nombre: string;
  carrera: string;
  fechaIngreso: string;
}

@Component({
  imports: [FormsModule],
  selector: 'app-estudiante',
  styleUrl: './estudiante.component.css',
  templateUrl: './estudiante.component.html',
})
export class EstudianteComponent {

  constructor(private router: Router) {}
  indiceEditar = -1;
  estudiantes: Estudiante[] = [];
  cuenta: string = '';
  nombre: string = '';
  carrera: string = '';
  fechaIngreso: string = '';
  ngOnInit() {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    const estudiantesGuardados = localStorage.getItem('registrosEstudiantes');
    if (estudiantesGuardados) {
      this.estudiantes = JSON.parse(estudiantesGuardados);
    }
  }
  guardarEstudiantes() {

    //validar que los campos no estén vacíos
    if (!this.cuenta.trim() || !this.nombre.trim() || !this.carrera.trim() || !this.fechaIngreso.trim()) {
      alert('Por favor, complete todos los campos');
      return;
    }

    //CREATE
    if (this.indiceEditar === -1) {
    //generar id automático
    const id = this.estudiantes.length > 0 ? this.estudiantes[this.estudiantes.length - 1].id + 1 : 1;
    //Agregar un nuevo estudiante
    this.estudiantes.push({
      id,
      cuenta: this.cuenta,
      nombre: this.nombre,
      carrera: this.carrera,
      fechaIngreso: this.fechaIngreso
    });

    // Guardar los estudiantes en el almacenamiento local
    localStorage.setItem('registrosEstudiantes', JSON.stringify(this.estudiantes));

    this.limpiar();
  } else {
    //UPDATE
    this.estudiantes[this.indiceEditar].cuenta = this.cuenta;
    this.estudiantes[this.indiceEditar].nombre = this.nombre;
    this.estudiantes[this.indiceEditar].carrera = this.carrera;
    this.estudiantes[this.indiceEditar].fechaIngreso = this.fechaIngreso;

    // Guardar los estudiantes actualizados en el almacenamiento local
    localStorage.setItem('registrosEstudiantes', JSON.stringify(this.estudiantes));
    this.limpiar();
  }

  }

  editarEstudiante(indice: number) {
    const estudiante = this.estudiantes[indice];
    this.cuenta = estudiante.cuenta;
    this.nombre = estudiante.nombre;
    this.carrera = estudiante.carrera;
    this.fechaIngreso = estudiante.fechaIngreso;
    this.indiceEditar = indice;
  }

  //Metodo para limpiar pantalla
  limpiar() {
    this.cuenta = '';
    this.nombre = '';
    this.carrera = '';
    this.fechaIngreso = '';
    this.indiceEditar = -1;
  }

  //DELETE
  eliminarEstudiante(indice:number){
    if(confirm("Estas seguro que quieres elimianr a este estudiante")){
      this.estudiantes.splice(indice,1);
      localStorage.setItem('registroEstudiantes', JSON.stringify(this.estudiantes));
      this.limpiar;


    }
  }

 


}
