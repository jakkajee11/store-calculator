import Order from './Order';
import Product from './Product';
import { ProductType } from './ProductType';

export default class OrderBuilder {
  availableItems: { [key: string]: Product };
  order: Order;

  constructor(availableItems: { [key: string]: Product }) {
    this.availableItems = availableItems;
    this.order = new Order();
  }

  addItem(type: ProductType, quantity: number = 1) {
    if (this.order.items[type] === undefined) {
      this.order.items[type] = {
        item: this.availableItems[type],
        quantity,
      };
    } else {
      this.order.items[type].quantity += quantity;
    }

    return this;
  }

  build() {
    return this.order;
  }
}
