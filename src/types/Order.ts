import Product from './Product';
import { ProductType } from './ProductType';

export class OrderItem {
  item: Product;
  quantity: number;

  constructor(item: Product, quantity: number = 1) {
    this.item = item;
    this.quantity = quantity;
  }
}

export default class Order {
  items: { [key: string]: OrderItem };

  constructor() {
    this.items = {};
  }
}
