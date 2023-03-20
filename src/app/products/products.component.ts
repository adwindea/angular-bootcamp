import { Component } from '@angular/core';
import axios from 'axios';
import { Product } from 'src/models/product.model';
import { GlobalVariable } from '../global-variable';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  apiUrl: string = GlobalVariable.apiUrl+'products'
  products: Product[] = []
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
