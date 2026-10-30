import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-producto-component',
  styleUrl: './producto-component.component.css',
  templateUrl: './producto-component.component.html',
})
export class ProductoComponentComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (localStorage.getItem('sesionTienda') !== 'si') {
      this.router.navigate(['/login']);
    }
  }

  cerrarSesion(): void {
    localStorage.removeItem('sesionTienda');
    this.router.navigate(['/login']);
  }
}
