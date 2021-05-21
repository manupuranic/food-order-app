import { Fragment } from "react";
import styles from "./Header.module.css";
import mainImg from "../../assets/veg-meals.jpg";
import HeaderButtonCart from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>Vmeals4U</h1>
        <HeaderButtonCart onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={mainImg} alt="A table full of delicious food" />
      </div>
    </Fragment>
  );
};

export default Header;
