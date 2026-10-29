import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface Libro {
  id: number;
  codigo: string;
  titulo: string;
  autor: string;
  anio: number;

}

@Component({
  imports: [],
  selector: 'app-libro',
  styleUrl: './libro.component.css',
  templateUrl: './libro.component.html',
})
export class LibroComponent {

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
}
