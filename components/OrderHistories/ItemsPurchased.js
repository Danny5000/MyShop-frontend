import Link from "next/link";

function formatCurrency(value) {
  return "$" + value.toFixed(2);
}

function ItemsPurchased({ orders }) {
  return (
    <div className="flex flex-col pl-2 place-items-center ">
      {orders?.map((order, index) => (
        <div
          key={index}
          className="flex flex-col border shadow hover:shadow-lg pr-2"
        >
          <span className="flex pt-2 pl-2 space-x-12 text-xs">
            <div className="flex space-x-0.5">
              Order ID:{" "}
              {order.map((item, index) => (
                <p key={index}>{item.orderId}</p>
              ))}
            </div>
            <div className="flex space-x-0.5">
              Order Date:{" "}
              {order.map((item, index) => (
                <p key={index}>{item.orderDate}</p>
              ))}
            </div>
          </span>

          <div className="flex flex-col text-sm">
            <table className="mt-4">
              <thead>
                <tr>
                  <th className="">Product</th>
                  <th className="">Price</th>
                  <th className="">Quantity</th>
                  <th className="">Total</th>
                  <th className="">Seller</th>
                </tr>
              </thead>
              <tbody>
                {order.map(
                  (item, index) =>
                    item.cartItem && (
                      <tr key={index}>
                        <td className="py-1 text-center text-blue-500 hover:text-purple-500">
                          <Link
                            href={`/products/${item.cartItem.productId}`}
                            as={`/products/${item.cartItem.productId}`}
                            to={`/products/${item.cartItem.productId}`}
                          >
                            <a>{item.cartItem.productName}</a>
                          </Link>
                        </td>
                        <td className="py-1 text-center">
                          {item.cartItem.productPrice &&
                            formatCurrency(item.cartItem.productPrice)}
                        </td>
                        <td className="py-1 text-center">
                          {item.cartItem.quantity}
                        </td>
                        <td className="py-1 text-center">
                          {item.cartItem.total &&
                            formatCurrency(item.cartItem.total)}
                        </td>
                        <td className="py-1 text-center text-blue-500 hover:text-purple-500">
                          <Link
                            href={`/users/${item.sellerName}`}
                            as={`/users/${item.sellerName}`}
                            to={`/users/${item.sellerName}`}
                          >
                            <a>{item.sellerName}</a>
                          </Link>
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>

          <div className="flex space-x-0.5 mb-2 ml-2 mt-2 text-sm">
            Total:{" "}
            {order.map((item, index) => (
              <p key={index}>{item.total && formatCurrency(item.total)}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemsPurchased;
