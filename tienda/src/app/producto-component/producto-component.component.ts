import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  existencias: number;
}

@Component({
  imports: [DecimalPipe],
  selector: 'app-producto-component',
  styleUrl: './producto-component.component.css',
  templateUrl: './producto-component.component.html',
})
export class ProductoComponentComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('sesionTienda') !== 'si') {
      this.router.navigate(['/login']);
      return;
    }

    const guardados = localStorage.getItem('productosTienda');
    if (guardados) {
      try {
        const productos = JSON.parse(guardados);
        if (Array.isArray(productos)) {
          this.productos = productos;
        }
      } catch {
        alert('No se pudieron leer los productos guardados. Revise los datos de LocalStorage.');
      }
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('sesionTienda');
    this.router.navigate(['/login']);
  }
}
