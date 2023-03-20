import { Component, Input } from '@angular/core';
import { Product } from 'src/models/product.model';
import { CartService } from 'src/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input() product : Product

  cart: any[] = []

  constructor(private cartService: CartService) {}

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
