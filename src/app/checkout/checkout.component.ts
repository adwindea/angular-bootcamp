import { Component } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import { Router } from '@angular/router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { GlobalVariable } from '../global-variable';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cart: any[] = []
  totalItem: number = 0
  totalPrice: number = 0

  constructor(private router: Router, private cartService: CartService) {}

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
    console.log(this.cart.length)
    if (this.cart.length > 0) {
      checkoutForm.product = this.cart.reduce((acc, curr) => {
        acc.push({ name: curr.name, price: curr.price, quantity: curr.quantity });
        return acc;
      }, []);

      axios.post(GlobalVariable.apiUrl+'orders', checkoutForm).then(res => {
        Swal.fire({
          icon: 'success',
          title: 'Your order has been placed.',
          showConfirmButton: false,
          timer: 1000
        })
        this.cartService.setData([])
        this.router.navigate([''])
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
