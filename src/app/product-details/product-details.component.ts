import { GlobalVariable } from './../global-variable';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/services/cart.service';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  product: Product
  cart: any[] = []

  constructor(private route: ActivatedRoute, private cartService: CartService) {}

  ngOnInit() {
    let id = Number(this.route.snapshot.paramMap.get('id'))
    this.getProduct(id)
  }

  getProduct(id: number) {
    axios.get(GlobalVariable.apiUrl+'products?id='+id).then(res => {
      this.product = res.data[0]
    })
  }

  addToCart() {
    this.cart = this.cartService.getData()
    if(this.cart.findIndex(c => c.id == this.product.id) === -1){
      this.product.quantity = 1
      this.cart.push(this.product)
      this.cartService.setData(this.cart)
      Swal.fire({
        icon: 'success',
        title: 'Product is added to your cart!',
        showConfirmButton: false,
        timer: 1000
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Product already in your cart!',
        showConfirmButton: false,
        timer: 1000
      })
    }
  }
}
