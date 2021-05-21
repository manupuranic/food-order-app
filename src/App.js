import { useState } from "react";
import Header from "./Components/Layouts/Header";
import Meals from "./Components/Meals/Meals";
import Cart from "./Components/Cart/Cart";
import CartProvider from "./Store/CartProvider";
import Order from "./Components/Cart/Order";

function App() {
  const [showCart, setShowCart] = useState(false);

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const showCartHandler = () => {
    setShowCart(true);
  };

  const hideCartHandler = () => {
    setShowCart(false);
  };

  const orderShowHandler = () => {
    setShowCart(false);
    setIsOrderPlaced(true);
  };

  const orderHideHandler = () => {
    setIsOrderPlaced(false);
  };

  return (
    <CartProvider>
      {showCart && (
        <Cart onCloseCart={hideCartHandler} onOrderPlaced={orderShowHandler} />
      )}
      {isOrderPlaced && <Order onClose={orderHideHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
