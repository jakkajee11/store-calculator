import { ProductType } from './ProductType';

export default class Product {
  type: ProductType;
  price: number;

  constructor(type: ProductType, price: number) {
    this.type = type;
    this.price = price;
  }
}
