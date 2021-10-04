function formatCurrency(value) {
  return "$" + value.toFixed(2);
}

function CartTable({ cartItems }) {
  return (
    <table>
      <thead>
        <tr>
          <th className="px-4 py-2">Product</th>
          <th className="px-4 py-2">Price</th>
          <th className="px-4 py-2">Quantity</th>
          <th className="px-4 py-2">Total</th>
        </tr>
      </thead>
      <tbody>
        {cartItems.data.map((cartItem) => (
          <tr key={cartItem.id}>
            <td className="px-4 py-2">{cartItem.productName}</td>
            <td className="px-4 py-2 text-right">
              {formatCurrency(cartItem.productPrice)}
            </td>
            <td className="px-4 py-2 text-right">{cartItem.quantity}</td>
            <td className="px-4 py-2 text-right">
              {formatCurrency(cartItem.total)}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <th className="px-4 py-2 text-left">Total</th>
          <th></th>
          <th></th>
          <th className="px-4 py-2 text-right">
            {formatCurrency(cartItems.cartTotal)}
          </th>
        </tr>
      </tfoot>
    </table>
  );
}

export default CartTable;
