import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceFunctions } from '../service/service.service';

@Component({
  selector: 'app-cart',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems:any[] = [];

  constructor(private functions: ServiceFunctions){}

  ngOnInit(){
    this.cartItems = this.functions.getCartItems();
  }

  get totalItems(){
    return this.functions.getCartTotalItems();
  }
  get totalPrice(){
    return this.functions.getCartTotalPrice();
  }
}

