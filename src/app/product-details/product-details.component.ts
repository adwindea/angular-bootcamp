import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/services/cart.service';
import Swal from 'sweetalert2';
import axios from 'axios';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {
  apiUrl: string = 'http://localhost:3000/products'
  product: any = {}
  cart: any[] = []

  constructor(private route: ActivatedRoute, private cartService: CartService) {}

  ngOnInit() {
    let id = Number(this.route.snapshot.paramMap.get('id'))
    this.getProduct(id)
  }

  getProduct(id: number) {
    axios.get(this.apiUrl+'?id='+id).then(res => {
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
