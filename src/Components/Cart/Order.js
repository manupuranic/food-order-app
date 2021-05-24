import Modal from "../UI/Modal";
import styles from "./Order.module.css";

const Order = (props) => {
  return (
    <Modal>
      <div className={styles.order}>
        <h3>Your order has been placed!</h3>
        <button onClick={props.onClose}>Okay</button>
      </div>
    </Modal>
  );
};

export default Order;
