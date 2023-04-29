import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import {
  clearCart,
  calculateTotal,
  getCartItems,
} from "../features/cart/CartItemSlice";
import { openModel } from "../features/models/modelSlice";

function CartContainer() {
  const dispatch = useDispatch();
  const { items, total, isLoading, amount } = useSelector(
    (state) => state.cart
  );
  useEffect(() => {
    dispatch(calculateTotal());
  }, [items]);

  useEffect(() => {
    dispatch(getCartItems("ashutosh", "panigrahi"));
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>loading...</h1>
      </div>
    );
  }

  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your Bag!!</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }
  return (
    <section className="cart">
      <header>
        <h2>Your Bag</h2>
      </header>
      <div>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <CartItem {...item} />
            </div>
          );
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button className="btn clear-btn" onClick={() => dispatch(openModel())}>
          clear cart
        </button>
      </footer>
    </section>
  );
}

export default CartContainer;
