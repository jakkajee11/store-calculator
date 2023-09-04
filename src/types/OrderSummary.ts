export default class OrderSummary {
  totalItem: number;
  totalPrice: number;
  totalDiscount: number;
  discountPrice: number;
  netSum: number;

  constructor(totalItem: number, totalPrice: number, totalDiscount: number) {
    this.totalItem = totalItem;
    this.totalPrice = totalPrice;
    this.totalDiscount = totalDiscount;
    this.discountPrice = totalDiscount === 0 ? 0 : totalPrice * totalDiscount;
    this.netSum = totalPrice - this.discountPrice;
  }
}
