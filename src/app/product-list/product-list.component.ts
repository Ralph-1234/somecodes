import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ServiceFunctions } from '../service/service.service';

@Component({
  selector: 'app-product-list',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {

  searchProduct:string = "";
  products:any[] = [];

  constructor(private functions:ServiceFunctions){}

  ngOnInit(){
    this.products = this.functions.getProducts();
  }

  get filteredProduct(){
    return this.products.filter(product => 
      product.name.toLowerCase().includes(this.searchProduct.toLowerCase())      
    );
  }

  addToCart(product: any){
    this.functions.addToCart(product);
    alert(product.name + " is added to your cart!")
  }
}

