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

  }
 


}
