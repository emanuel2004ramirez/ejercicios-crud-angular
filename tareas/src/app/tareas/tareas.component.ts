import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface Tarea {
  id: number;
  titulo: string;
  descripcion: string;
  fechaLimite: string;
  completada: boolean;
}

@Component({
  imports: [FormsModule],
  selector: 'app-tareas',
  styleUrl: './tareas.component.css',
  templateUrl: './tareas.component.html',
})



export class TareasComponent {
  tareas: Tarea[] = [];
  constructor(private router: Router) {}
  titulo: string = '';
  descripcion: string = '';
  fechaLimite: string = '';
  completada: boolean = false;

 verTareas() {
  if (localStorage.getItem('sesionTareas') === 'si') {
   const tareasGuardadas = localStorage.getItem('agendaTareas');
   if (tareasGuardadas) {
     this.tareas = JSON.parse(tareasGuardadas);
   }
  } else {
    alert('Debes iniciar sesión para ver las tareas');
    this.router.navigate(['/login']);
  }

  
 }
ngOnInit() {
  this.verTareas();
}
  limpiar() {
    this.titulo = '';
    this.descripcion = '';
    this.fechaLimite = '';
    this.completada = false;
  }
}
