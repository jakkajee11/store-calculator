import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ProductType } from './types/ProductType';
import Product from './types/Product';
import OrderBuilder from './types/OrderBuilder';
import Calculator from './types/Calculator';
import Order, { OrderItem } from './types/Order';
import OrderSummary from './types/OrderSummary';

export const PRODUCTS = {
  [ProductType.Red]: new Product(ProductType.Red, 50),
  [ProductType.Green]: new Product(ProductType.Green, 40),
  [ProductType.Blue]: new Product(ProductType.Blue, 30),
  [ProductType.Yellow]: new Product(ProductType.Yellow, 50),
  [ProductType.Pink]: new Product(ProductType.Pink, 80),
  [ProductType.Purple]: new Product(ProductType.Purple, 90),
  [ProductType.Orange]: new Product(ProductType.Orange, 120),
};

function App() {
  const [orderItems, setOrderItems] = useState<{ [key: string]: OrderItem }>(
    {}
  );
  const [mSummary, setMemberSummary] = useState<OrderSummary>();
  const [nSummary, setNonMemberSummary] = useState<OrderSummary>();
  const [builder, setBuilder] = useState<OrderBuilder>(
    new OrderBuilder(PRODUCTS)
  );

  const addItem = (type: string) => {
    builder.addItem(type as ProductType);
    setOrderItems({ ...builder.build().items });
    const mSummary = new Calculator().checkOut(builder.build(), true);
    const nSummary = new Calculator().checkOut(builder.build(), false);
    setMemberSummary({ ...mSummary });
    setNonMemberSummary({ ...nSummary });
  };

  const toPercentage = (value?: number) => {
    if (value) return `${(value * 100).toFixed(0)}%`;

    return '0%';
  };

  const toFixedNumber = (value?: number) => {
    if (value) return value.toFixed(2);

    return 0;
  };

  const getItems = () => {
    return Object.keys(orderItems).map((type) => orderItems[type]);
  };

  const reset = () => {
    setBuilder(new OrderBuilder(PRODUCTS));
    setOrderItems({});
    setMemberSummary(undefined);
    setNonMemberSummary(undefined);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h2>Calculator</h2>
        <p>Click button to see calculate result</p>
        <div>
          {Object.keys(PRODUCTS).map((key) => (
            <button key={key} className={key} onClick={() => addItem(key)}>
              {key} ({PRODUCTS[key as ProductType].price})
            </button>
          ))}
        </div>
        <button onClick={reset}>RESET</button>

        {mSummary && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '50% 50%',
            }}
          >
            <div>
              <h2>Member</h2>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {getItems().map(({ item, quantity }: OrderItem) => (
                    <tr key={item.type}>
                      <td>{item.type}</td>
                      <td>{item.price}</td>
                      <td>{quantity}</td>
                      <td>{item.price * quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <p>Total item(s): {mSummary?.totalItem}</p>
                <p>Total price: {mSummary?.totalPrice}</p>
                <p>Discount: {toPercentage(mSummary?.totalDiscount)}</p>
                <p>Discount price: {toFixedNumber(mSummary?.discountPrice)}</p>
                <p>Net: {toFixedNumber(mSummary?.netSum)}</p>
              </div>
            </div>
            <div>
              <h2>Non-Member</h2>
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {getItems().map(({ item, quantity }: OrderItem) => (
                    <tr key={item.type}>
                      <td>{item.type}</td>
                      <td>{item.price}</td>
                      <td>{quantity}</td>
                      <td>{item.price * quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div>
                <p>Total item(s): {nSummary?.totalItem}</p>
                <p>Total price: {nSummary?.totalPrice}</p>
                <p>Discount: {toPercentage(nSummary?.totalDiscount)}</p>
                <p>Discount price: {toFixedNumber(nSummary?.discountPrice)}</p>
                <p>Net: {toFixedNumber(nSummary?.netSum)}</p>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
