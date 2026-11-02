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
  indiceEditar: number = -1;

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

agregarTarea() {

  // CREAR
  if (this.indiceEditar === -1) {

    const id = this.tareas.length > 0
      ? this.tareas[this.tareas.length - 1].id + 1
      : 1;

    this.tareas.push({
      id,
      titulo: this.titulo,
      descripcion: this.descripcion,
      fechaLimite: this.fechaLimite,
      completada: this.completada
    });

  } else {

    // UPDATE
    this.tareas[this.indiceEditar].titulo = this.titulo;
    this.tareas[this.indiceEditar].descripcion = this.descripcion;
    this.tareas[this.indiceEditar].fechaLimite = this.fechaLimite;
    this.tareas[this.indiceEditar].completada = this.completada;

  }

  // GUARDAR Y LIMPIAR
  localStorage.setItem('agendaTareas', JSON.stringify(this.tareas));
  this.limpiar();
}

updateTarea(indice: number) {
  this.indiceEditar = indice;
  const tarea = this.tareas[indice];
  this.titulo = tarea.titulo;
  this.descripcion = tarea.descripcion;
  this.fechaLimite = tarea.fechaLimite;
  this.completada = tarea.completada;
}


  limpiar() {
    this.titulo = '';
    this.descripcion = '';
    this.fechaLimite = '';
    this.completada = false;
  }

  cerrarSesion() {
    localStorage.removeItem('sesionTareas');
    this.router.navigate(['/login']);
  }
}
