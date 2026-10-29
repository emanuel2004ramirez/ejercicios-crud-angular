import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

interface Libro {
  id: number;
  codigo: string;
  titulo: string;
  autor: string;
  anio: number;

}

@Component({
  imports: [FormsModule],
  selector: 'app-libro',
  styleUrl: './libro.component.css',
  templateUrl: './libro.component.html',
})
export class LibroComponent {
  codigo = '';
  titulo = '';
  autor = '';
  anio = 0;
  indiceEditar = -1;

  libros: Libro[] = [];
  constructor(private router: Router) {
    const sesion = localStorage.getItem('sesionBiblioteca');
    if (sesion !== 'si') {
      this.router.navigate(['/login']);
    }

    this.cargar();


  }

  cargar() {
    const datos = localStorage.getItem('librosBiblioteca');
    if (datos) {
      this.libros = JSON.parse(datos);
    }else {
      this.libros = [];
    }

  }


  guardar() {
    if ( !this.codigo ||    !this.titulo || !this.autor || 
    !Number.isInteger(this.anio) ||
    this.anio < 1000 ||
    this.anio > 9999
)  {
    alert('Por favor, complete todos los campos correctamente.');
    return;
}

let nunuevoId = 1;
if (this.indiceEditar === -1) {
for (const libro of this.libros) {
  if (libro.id >= nunuevoId) {
    nunuevoId = libro.id + 1;
  }
}

const nuevoLibro: Libro = {
  id: nunuevoId,
  codigo: this.codigo,
  titulo: this.titulo,
  autor: this.autor,
  anio: this.anio
};

this.libros.push(nuevoLibro);
} else {
  this.libros[this.indiceEditar].codigo = this.codigo;
  this.libros[this.indiceEditar].titulo = this.titulo;
  this.libros[this.indiceEditar].autor = this.autor;
  this.libros[this.indiceEditar].anio = this.anio;
}
localStorage.setItem('librosBiblioteca', JSON.stringify(this.libros));
this.limpiar();

alert('Libro guardado correctamente.');

  }


  limpiar() {
  this.codigo = '';
  this.titulo = '';
  this.autor = '';
  this.anio = 0;
  this.indiceEditar = -1;
} 

editar(indice: number) {
  const libro = this.libros[indice];
  this.codigo = libro.codigo;
  this.titulo = libro.titulo;
  this.autor = libro.autor;
  this.anio = libro.anio;
  this.indiceEditar = indice; 
}

eliminar(indice: number) {
  if (confirm('¿Está seguro de que desea eliminar este libro?')) {
    this.libros.splice(indice, 1);
    localStorage.setItem('librosBiblioteca', JSON.stringify(this.libros));
    alert('Libro eliminado correctamente.');
    this.limpiar();
  }
}
}

