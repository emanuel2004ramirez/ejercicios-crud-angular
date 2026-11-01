import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

interface Producto {
  id: number;
  codigo: string;
  nombre: string;
  precio: number;
  existencias: number;
}

@Component({
  imports: [DecimalPipe, FormsModule],
  selector: 'app-producto-component',
  styleUrl: './producto-component.component.css',
  templateUrl: './producto-component.component.html',
})
export class ProductoComponentComponent implements OnInit {
  productos: Producto[] = [];
  codigo: string = '';
  nombre: string = '';
  precio: number | null = null;
  existencias: number | null = null;
  indiceEditar = -1;

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

  guardar(formulario: NgForm): void {
    if (!this.codigo.trim() || !this.nombre.trim()) {
      alert('El código y el nombre son obligatorios.');
      return;
    }
    if (this.precio === null || !Number.isFinite(this.precio) || this.precio <= 0) {
      alert('El precio debe ser mayor que cero.');
      return;
    }
    if (this.existencias === null || !Number.isInteger(this.existencias) || this.existencias < 0) {
      alert('Las existencias deben ser un entero mayor o igual que cero.');
      return;
    }

    if (this.indiceEditar === -1) {
      const id = this.productos.reduce((mayor, producto) => Math.max(mayor, producto.id), 0) + 1;
      this.productos.push({
        id,
        codigo: this.codigo.trim(),
        nombre: this.nombre.trim(),
        precio: this.precio,
        existencias: this.existencias,
      });
    } else {
      const producto = this.productos[this.indiceEditar];
      producto.codigo = this.codigo.trim();
      producto.nombre = this.nombre.trim();
      producto.precio = this.precio;
      producto.existencias = this.existencias;
    }
    localStorage.setItem('productosTienda', JSON.stringify(this.productos));
    this.limpiar(formulario);
  }

  editar(indice: number): void {
    const producto = this.productos[indice];
    this.codigo = producto.codigo;
    this.nombre = producto.nombre;
    this.precio = producto.precio;
    this.existencias = producto.existencias;
    this.indiceEditar = indice;
  }

  limpiar(formulario: NgForm): void {
    formulario.resetForm({ codigo: '', nombre: '', precio: null, existencias: null });
    this.indiceEditar = -1;
  }

  cerrarSesion(): void {
    localStorage.removeItem('sesionTienda');
    this.router.navigate(['/login']);
  }
}
