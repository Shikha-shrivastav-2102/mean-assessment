
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list.html'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  loading = false;
  errorMessage = '';

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this.errorMessage = '';

    this.productService.getProducts().subscribe({
      next: (response) => {
        this.products = response.data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Unable to load products';
        this.loading = false;
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
}
