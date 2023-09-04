import { PRODUCTS } from './App';
import Calculator from './types/Calculator';
import OrderBuilder from './types/OrderBuilder';
import OrderSummary from './types/OrderSummary';
import Product from './types/Product';
import { ProductType } from './types/ProductType';

test('non-member: Red single item should not get any discount', () => {
  const order = new OrderBuilder(PRODUCTS).addItem(ProductType.Red, 1).build();
  const result = new Calculator().checkOut(order);

  expect(result.totalItem).toBe(1);
  expect(result.totalPrice).toBe(50);
  expect(result.totalDiscount).toBe(0);
  expect(result.discountPrice).toBe(0);
  expect(result.netSum).toBe(50);
});

test('non-member: Blue single item should not get any discount', () => {
  const order = new OrderBuilder(PRODUCTS).addItem(ProductType.Blue, 1).build();
  const result = new Calculator().checkOut(order);

  expect(result.totalItem).toBe(1);
  expect(result.totalPrice).toBe(30);
  expect(result.totalDiscount).toBe(0);
  expect(result.discountPrice).toBe(0);
  expect(result.netSum).toBe(30);
});

test('non-member: Yellow single item should not get any discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Yellow, 1)
    .build();
  const result = new Calculator().checkOut(order);

  expect(result.totalItem).toBe(1);
  expect(result.totalPrice).toBe(50);
  expect(result.totalDiscount).toBe(0);
  expect(result.discountPrice).toBe(0);
  expect(result.netSum).toBe(50);
});

test('non-member: Purple single item should not get any discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Purple, 1)
    .build();
  const result = new Calculator().checkOut(order);

  expect(result.totalItem).toBe(1);
  expect(result.totalPrice).toBe(90);
  expect(result.totalDiscount).toBe(0);
  expect(result.discountPrice).toBe(0);
  expect(result.netSum).toBe(90);
});

test('non-member: Pink single item should not get any discount', () => {
  const order = new OrderBuilder(PRODUCTS).addItem(ProductType.Pink, 1).build();
  const result = new Calculator().checkOut(order);

  expect(result.totalItem).toBe(1);
  expect(result.totalPrice).toBe(80);
  expect(result.totalDiscount).toBe(0);
  expect(result.discountPrice).toBe(0);
  expect(result.netSum).toBe(80);
});

test('non-member: Green single item should not get any discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Green, 1)
    .build();
  const result = new Calculator().checkOut(order);

  expect(result.totalItem).toBe(1);
  expect(result.totalPrice).toBe(40);
  expect(result.totalDiscount).toBe(0);
  expect(result.discountPrice).toBe(0);
  expect(result.netSum).toBe(40);
});

test('non-member: Orange single item should not get any discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Orange, 1)
    .build();
  const result = new Calculator().checkOut(order);

  expect(result.totalItem).toBe(1);
  expect(result.totalPrice).toBe(120);
  expect(result.totalDiscount).toBe(0);
  expect(result.discountPrice).toBe(0);
  expect(result.netSum).toBe(120);
});

test('non-member: Red + Green items no double Orange, Pink or Green should not get any discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Red, 1)
    .addItem(ProductType.Green, 1)
    .build();
  const result = new Calculator().checkOut(order);

  expect(result.totalItem).toBe(2);
  expect(result.totalPrice).toBe(90);
  expect(result.totalDiscount).toBe(0);
  expect(result.discountPrice).toBe(0);
  expect(result.netSum).toBe(90);
});

test('non-member: multiple items no double Orange, Pink or Green should not get any discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Orange, 1)
    .addItem(ProductType.Pink, 1)
    .addItem(ProductType.Green, 1)
    .build();
  const result = new Calculator().checkOut(order);

  expect(result.totalItem).toBe(3);
  expect(result.totalPrice).toBe(240);
  expect(result.totalDiscount).toBe(0);
  expect(result.discountPrice).toBe(0);
  expect(result.netSum).toBe(240);
});

test('non-member: double Orange items should get 5% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Orange, 2)
    .build();
  const result = new Calculator().checkOut(order);

  const totalPrice = 240; // 120 + 120;
  expect(result.totalItem).toBe(2);
  expect(result.totalPrice).toBe(totalPrice);
  expect(result.totalDiscount).toBeCloseTo(0.05);
  expect(result.discountPrice).toBeCloseTo(totalPrice * 0.05);
  expect(result.netSum).toBeCloseTo(totalPrice - totalPrice * 0.05);
});

test('non-member: Orange >= 2 items should get 5% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Orange, 4)
    .build();
  const result = new Calculator().checkOut(order);

  const totalPrice = 480; // 120 + 120 + 120 + 120;
  expect(result.totalItem).toBe(4);
  expect(result.totalPrice).toBe(totalPrice);
  expect(result.totalDiscount).toBeCloseTo(0.05);
  expect(result.discountPrice).toBeCloseTo(totalPrice * 0.05);
  expect(result.netSum).toBeCloseTo(totalPrice - totalPrice * 0.05);
});

test('non-member: double Pink items should get 5% discount', () => {
  const order = new OrderBuilder(PRODUCTS).addItem(ProductType.Pink, 2).build();
  const result = new Calculator().checkOut(order);

  const totalPrice = 160; // 80 + 80;
  expect(result.totalItem).toBe(2);
  expect(result.totalPrice).toBe(totalPrice);
  expect(result.totalDiscount).toBeCloseTo(0.05);
  expect(result.discountPrice).toBeCloseTo(totalPrice * 0.05);
  expect(result.netSum).toBeCloseTo(totalPrice - totalPrice * 0.05);
});

test('non-member: Pink >= 2 items should get 5% discount', () => {
  const order = new OrderBuilder(PRODUCTS).addItem(ProductType.Pink, 4).build();
  const result = new Calculator().checkOut(order);

  const totalPrice = 320; // 80 + 80 + 80 + 80;
  expect(result.totalItem).toBe(4);
  expect(result.totalPrice).toBe(totalPrice);
  expect(result.totalDiscount).toBeCloseTo(0.05);
  expect(result.discountPrice).toBeCloseTo(totalPrice * 0.05);
  expect(result.netSum).toBeCloseTo(totalPrice - totalPrice * 0.05);
});

test('non-member: double Green items should get 5% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Green, 2)
    .build();
  const result = new Calculator().checkOut(order);

  const totalPrice = 80; // 40 + 40;
  expect(result.totalItem).toBe(2);
  expect(result.totalPrice).toBe(totalPrice);
  expect(result.totalDiscount).toBeCloseTo(0.05);
  expect(result.discountPrice).toBeCloseTo(totalPrice * 0.05);
  expect(result.netSum).toBeCloseTo(totalPrice - totalPrice * 0.05);
});

test('non-member: Green >= 2 items should get 5% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Green, 4)
    .build();
  const result = new Calculator().checkOut(order);

  const totalPrice = 160; // 40 + 40 + 40 + 40;
  expect(result.totalItem).toBe(4);
  expect(result.totalPrice).toBe(totalPrice);
  expect(result.totalDiscount).toBeCloseTo(0.05);
  expect(result.discountPrice).toBeCloseTo(totalPrice * 0.05);
  expect(result.netSum).toBeCloseTo(totalPrice - totalPrice * 0.05);
});

test('non-member: multiple items has double Orange, Pink or Green should get 5% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Orange, 2)
    .addItem(ProductType.Pink, 2)
    .addItem(ProductType.Green, 2)
    .build();
  const result = new Calculator().checkOut(order);

  const totalPrice = 480; // 120 + 120 + 80 + 80 + 40 + 40;
  expect(result.totalItem).toBe(6);
  expect(result.totalPrice).toBe(totalPrice);
  expect(result.totalDiscount).toBeCloseTo(0.05);
  expect(result.discountPrice).toBeCloseTo(totalPrice * 0.05);
  expect(result.netSum).toBeCloseTo(totalPrice - totalPrice * 0.05);
});

// MEMBER
test('member: Red single item should get 10% discount', () => {
  const order = new OrderBuilder(PRODUCTS).addItem(ProductType.Red, 1).build();
  const result = new Calculator().checkOut(order, true);

  expect(result.totalItem).toBe(1);
  expect(result.totalPrice).toBe(50);
  expect(result.totalDiscount).toBe(0.1);
  expect(result.discountPrice).toBe(5);
  expect(result.netSum).toBe(45);
});

test('member: Blue single item should get 10% discount', () => {
  const order = new OrderBuilder(PRODUCTS).addItem(ProductType.Blue, 1).build();
  const result = new Calculator().checkOut(order, true);

  expect(result.totalItem).toBe(1);
  expect(result.totalPrice).toBe(30);
  expect(result.totalDiscount).toBe(0.1);
  expect(result.discountPrice).toBe(3);
  expect(result.netSum).toBe(27);
});

test('member: Yellow single item should get 10% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Yellow, 1)
    .build();
  const result = new Calculator().checkOut(order, true);

  expect(result.totalItem).toBe(1);
  expect(result.totalPrice).toBe(50);
  expect(result.totalDiscount).toBe(0.1);
  expect(result.discountPrice).toBe(5);
  expect(result.netSum).toBe(45);
});

test('member: Purple single item should get 10% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Purple, 1)
    .build();
  const result = new Calculator().checkOut(order, true);

  expect(result.totalItem).toBe(1);
  expect(result.totalPrice).toBe(90);
  expect(result.totalDiscount).toBe(0.1);
  expect(result.discountPrice).toBe(9);
  expect(result.netSum).toBe(81);
});

test('member: Pink single item should get 10% discount', () => {
  const order = new OrderBuilder(PRODUCTS).addItem(ProductType.Pink, 1).build();
  const result = new Calculator().checkOut(order, true);

  expect(result.totalItem).toBe(1);
  expect(result.totalPrice).toBe(80);
  expect(result.totalDiscount).toBe(0.1);
  expect(result.discountPrice).toBe(8);
  expect(result.netSum).toBe(72);
});

test('member: Green single item should get 10% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Green, 1)
    .build();
  const result = new Calculator().checkOut(order, true);

  expect(result.totalItem).toBe(1);
  expect(result.totalPrice).toBe(40);
  expect(result.totalDiscount).toBe(0.1);
  expect(result.discountPrice).toBe(4);
  expect(result.netSum).toBe(36);
});

test('member: Orange single item should get 10% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Orange, 1)
    .build();
  const result = new Calculator().checkOut(order, true);

  expect(result.totalItem).toBe(1);
  expect(result.totalPrice).toBe(120);
  expect(result.totalDiscount).toBe(0.1);
  expect(result.discountPrice).toBe(12);
  expect(result.netSum).toBe(108);
});

test('member: multiple items no double Orange, Pink or Green should only get 10% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Red, 2)
    .addItem(ProductType.Blue, 2)
    .addItem(ProductType.Purple, 2)
    .addItem(ProductType.Orange, 1)
    .addItem(ProductType.Pink, 1)
    .addItem(ProductType.Green, 1)
    .build();
  const result = new Calculator().checkOut(order, true);

  expect(result.totalItem).toBe(9);
  expect(result.totalPrice).toBe(580);
  expect(result.totalDiscount).toBe(0.1);
  expect(result.discountPrice).toBe(58);
  expect(result.netSum).toBe(580 - 58);
});

test('member: double Orange items should get 10% + 5% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Orange, 2)
    .build();
  const result = new Calculator().checkOut(order, true);

  const totalPrice = 240; // 120 + 120;
  expect(result.totalItem).toBe(2);
  expect(result.totalPrice).toBe(totalPrice);
  expect(result.totalDiscount).toBeCloseTo(0.15);
  expect(result.discountPrice).toBeCloseTo(totalPrice * 0.15);
  expect(result.netSum).toBeCloseTo(totalPrice - totalPrice * 0.15);
});

test('member: Orange >= 2 items should get 10% + 5% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Orange, 4)
    .build();
  const result = new Calculator().checkOut(order, true);

  const totalPrice = 480; // 120 + 120 + 120 + 120;
  expect(result.totalItem).toBe(4);
  expect(result.totalPrice).toBe(totalPrice);
  expect(result.totalDiscount).toBeCloseTo(0.15);
  expect(result.discountPrice).toBeCloseTo(totalPrice * 0.15);
  expect(result.netSum).toBeCloseTo(totalPrice - totalPrice * 0.15);
});

test('member: double Pink items should get 10% + 5% discount', () => {
  const order = new OrderBuilder(PRODUCTS).addItem(ProductType.Pink, 2).build();
  const result = new Calculator().checkOut(order, true);

  const totalPrice = 160; // 80 + 80;
  expect(result.totalItem).toBe(2);
  expect(result.totalPrice).toBe(totalPrice);
  expect(result.totalDiscount).toBeCloseTo(0.15);
  expect(result.discountPrice).toBeCloseTo(totalPrice * 0.15);
  expect(result.netSum).toBeCloseTo(totalPrice - totalPrice * 0.15);
});

test('member: Pink >= 2 items should get 10% + 5% discount', () => {
  const order = new OrderBuilder(PRODUCTS).addItem(ProductType.Pink, 4).build();
  const result = new Calculator().checkOut(order, true);

  const totalPrice = 320; // 80 + 80 + 80 + 80;
  expect(result.totalItem).toBe(4);
  expect(result.totalPrice).toBe(totalPrice);
  expect(result.totalDiscount).toBeCloseTo(0.15);
  expect(result.discountPrice).toBeCloseTo(totalPrice * 0.15);
  expect(result.netSum).toBeCloseTo(totalPrice - totalPrice * 0.15);
});

test('member: double Green items should get 10% + 5% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Green, 2)
    .build();
  const result = new Calculator().checkOut(order, true);

  const totalPrice = 80; // 40 + 40;
  expect(result.totalItem).toBe(2);
  expect(result.totalPrice).toBe(totalPrice);
  expect(result.totalDiscount).toBeCloseTo(0.15);
  expect(result.discountPrice).toBeCloseTo(totalPrice * 0.15);
  expect(result.netSum).toBeCloseTo(totalPrice - totalPrice * 0.15);
});

test('member: Green >= 2 items should get 10% + 5% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Green, 4)
    .build();
  const result = new Calculator().checkOut(order, true);

  const totalPrice = 160; // 40 + 40 + 40 + 40;
  expect(result.totalItem).toBe(4);
  expect(result.totalPrice).toBe(totalPrice);
  expect(result.totalDiscount).toBeCloseTo(0.15);
  expect(result.discountPrice).toBeCloseTo(totalPrice * 0.15);
  expect(result.netSum).toBeCloseTo(totalPrice - totalPrice * 0.15);
});

test('member: multiple items has double Orange, Pink or Green should get 10% + 5% discount', () => {
  const order = new OrderBuilder(PRODUCTS)
    .addItem(ProductType.Orange, 2)
    .addItem(ProductType.Pink, 2)
    .addItem(ProductType.Green, 2)
    .build();
  const result = new Calculator().checkOut(order, true);

  const totalPrice = 480; // 120 + 120 + 80 + 80 + 40 + 40;
  expect(result.totalItem).toBe(6);
  expect(result.totalPrice).toBe(totalPrice);
  expect(result.totalDiscount).toBeCloseTo(0.15);
  expect(result.discountPrice).toBeCloseTo(totalPrice * 0.15);
  expect(result.netSum).toBeCloseTo(totalPrice - totalPrice * 0.15);
});
