import { useCart } from "./CartHandler";

const Cart = () => {
  const { quantity, setQuantity, clearCart, total } = useCart();

  return (
    <div>
      <h2>Ticket Cart</h2>
        <label>
        Quantity
        <input
            type="number"
            min="0"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
        />
        </label>
      <div>
        <strong>Total: ${total / 100}</strong>
      </div>
      <button onClick={clearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;