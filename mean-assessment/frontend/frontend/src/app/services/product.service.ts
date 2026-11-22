
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:5000/api/products';

  constructor(private http: HttpClient) {}

  // CREATE
  addProduct(product: Product): Observable<any> {
    return this.http.post(this.apiUrl, product);
  }

  // READ ALL
  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // READ BY ID
  getProductById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // UPDATE
  updateProduct(id: string, product: Product): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, product);
  }

  // DELETE
  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
