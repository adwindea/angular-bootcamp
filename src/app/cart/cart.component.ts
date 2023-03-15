import { Component } from '@angular/core';
import { CartService } from 'src/services/cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: any[] = []
  editedProduct: number = 0
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

  setEditing(id : number){
    this.editedProduct = id
  }

  saveCart(item: any) {
    const index = this.cart.findIndex(x => x.id === item.id);
    if (index >= 0) {
      if (this.cart[index].stock < item.quantity) {
        this.cart[index].quantity = item.stock;
        Swal.fire({
          icon: 'error',
          title: 'Product stock is not available. Your cart has been adjusted according to the available stock.',
          showConfirmButton: false,
          timer: 2000
        })
      } else if (item.quantity == 0) {
        this.deleteCart(item.id)
      } else if (item.quantity < 0) {
        this.cart[index].quantity = 1;
        Swal.fire({
          icon: 'error',
          title: 'Invalid quantity.',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        this.cart[index].quantity = item.quantity;
      }
      this.updateTotal()
    }
    this.editedProduct = 0
  }

  deleteCart(id: number) {
    const index = this.cart.findIndex(x => x.id === id);
    if (index >= 0) {
      this.cart.splice(index, 1)
      this.updateTotal()
    }
  }
}
