import Order, { OrderItem } from './Order';
import OrderSummary from './OrderSummary';
import { ProductType } from './ProductType';

/// Note:
/// member: maximum discount is 15%
/// non-member: maximum discount is 5%
/// discount is calculate from total price
export default class Calculator {
  totalItem: number;
  totalPrice: number;
  totalDiscount: number;

  constructor() {
    this.totalItem = 0;
    this.totalPrice = 0;
    this.totalDiscount = 0;
  }

  checkOut(order: Order, isMember: boolean = false): OrderSummary {
    if (order) {
      Object.keys(order.items).map((type) => {
        if (
          type === ProductType['Orange'] ||
          type === ProductType['Pink'] ||
          type === ProductType['Green']
        ) {
          if (order.items[type].quantity >= 2 && this.totalDiscount === 0) {
            this.totalDiscount += 0.05;
          }
        }

        this.totalItem += order.items[type].quantity;
        this.totalPrice +=
          order.items[type].item.price * order.items[type].quantity;
      });

      if (isMember) {
        this.totalDiscount += 0.1;
      }
    }

    return new OrderSummary(
      this.totalItem,
      this.totalPrice,
      this.totalDiscount
    );
  }
}
