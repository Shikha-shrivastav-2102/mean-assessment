
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'

})
export class ProductListComponent implements OnInit {
products = signal<Product[]>([]);
loading = signal(false);
errorMessage = signal('');

  constructor(
    private productService: ProductService,
    private router: Router,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

loadProducts(): void {

  this.loading.set(true);
  this.errorMessage.set('');

  this.productService.getProducts().subscribe({

    next: (response) => {
      this.products.set(response.data);
      this.loading.set(false);
    },

    error: () => {
      this.errorMessage.set('Unable to load products');
      this.loading.set(false);
    }

  });
}

  addProduct(): void {
    this.router.navigate(['/products/add']);
  }

  editProduct(id: string): void {
    this.router.navigate(['/products/edit', id]);
  }

  deleteProduct(id: string): void {

    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    this.productService.deleteProduct(id).subscribe({
      next: () => {
        alert('Product deleted successfully');
        this.loadProducts();
      },
      error: () => {
        alert('Unable to delete product');
      }
    });
  }

  logout() {
  this.authService.logout();
  this.router.navigate(['/login']);
}
}
