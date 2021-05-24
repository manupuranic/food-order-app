import styles from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../Store/Cart-context";
import { Fragment, useContext, useState } from "react";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `₹${cartCtx.totalAmount.toFixed(0)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // const cartItemClear = () => {
  //   cartCtx.emptyCart();
  //   props.onOrderPlaced();
  // };

  const orderHandler = () => {
    setShowCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-movies-2e31c-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItem: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.emptyCart();
  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onCloseCart}>
        Close
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const contentModal = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && (
        <Checkout onOrder={submitOrderHandler} onCancel={props.onCloseCart} />
      )}
      {!showCheckout && modalActions}
    </Fragment>
  );

  const orderPlaceModal = () => {
    if (!isSubmitting && didSubmit) {
      props.onOrderPlaced();
    }
  };

  orderPlaceModal();

  const isSubmittingContent = (
    <p className={styles["loading-text"]}>Placing order, please wait...</p>
  );

  return (
    <Fragment>
      <Modal onClose={props.onCloseCart}>
        {isSubmitting && !didSubmit && isSubmittingContent}
        {!isSubmitting && !didSubmit && contentModal}
      </Modal>
    </Fragment>
  );
};

export default Cart;
