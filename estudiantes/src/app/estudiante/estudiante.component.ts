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

  cargarEstudiantes() {
    const estudiantesGuardados = localStorage.getItem('estudiantes');
    if (estudiantesGuardados) {
      this.estudiantes = JSON.parse(estudiantesGuardados);
    }
  }
 


}
