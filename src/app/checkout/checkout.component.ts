import { Component } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import axios from 'axios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  apiUrl: string = 'http://localhost:3000/orders'
  cart: any[] = []
  totalItem: number = 0
  totalPrice: number = 0

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.getCart()
  }

  getCart() {
    this.cart = this.cartService.getData()
    this.updateTotal()
  }

  updateTotal() {
    this.totalItem = this.cart.reduce((sum, item) => sum + Number(item.quantity), 0);
    this.totalPrice = this.cart.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0);
  }

  checkout(checkoutForm) {
    if (this.cart.length > 1) {
      checkoutForm.product = this.cart.reduce((acc, curr) => {
        acc.push({ name: curr.name, price: curr.price, quantity: curr.quantity });
        return acc;
      }, []);

      axios.post(this.apiUrl, checkoutForm).then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Your order has been placed.',
          showConfirmButton: false,
          timer: 1000
        })
      }).catch(err => console.log(err))

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Your cart is empty.',
        showConfirmButton: false,
        timer: 2000
      })
    }
  }
}
