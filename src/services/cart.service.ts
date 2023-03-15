import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any[] = []

  constructor() { }

  setData(cart: any) {
    this.cart = cart
  }

  getData() {
    return this.cart
  }
}
