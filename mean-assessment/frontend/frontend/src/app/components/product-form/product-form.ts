
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html'
})
export class ProductFormComponent implements OnInit {

  productId: string | null = null;
  isEditMode = false;
productForm:any;


  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.productForm = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    description: ['', Validators.required]
  });
  }

  ngOnInit(): void {

    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId) {
      this.isEditMode = true;
      this.loadProduct(this.productId);
    }
  }

  loadProduct(id: string): void {

    this.productService.getProductById(id).subscribe({
      next: (response) => {
        this.productForm.patchValue(response.data);
      },
      error: () => {
        alert('Unable to load product');
      }
    });
  }

  saveProduct(): void {

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const product = this.productForm.getRawValue();

    if (this.productId) {

      this.productService.updateProduct(
        this.productId,
        product
      ).subscribe({
        next: () => {
          alert('Product updated successfully');
          this.router.navigate(['/products']);
        },
        error: () => alert('Update failed')
      });

    } else {

      this.productService.addProduct(product).subscribe({
        next: () => {
          alert('Product added successfully');
          this.router.navigate(['/products']);
        },
        error: () => alert('Unable to add product')
      });

    }
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }
}
