import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  apiUrl: string = 'http://localhost:3000/products'
  products = []
  productsCount : number = 0
  activeCategory: string = ''


  ngOnInit() {
    this.getProducts()
  }

  setActiveCategory(activeCategory: string) {
    this.activeCategory = activeCategory
    this.getProducts()
  }

  getProducts() {
    let url = this.activeCategory != '' ? this.apiUrl+'?category='+this.activeCategory : this.apiUrl
    axios.get(url).then(res => {
      this.products = res.data
      this.productsCount = res.data.length
    })
  }
}
