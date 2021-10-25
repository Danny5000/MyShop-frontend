import Link from "next/link";

function formatCurrency(value) {
  return "$" + value.toFixed(2);
}

function ItemsPurchased({ orders }) {
  console.log(orders);
  return (
    <div>
      {orders?.map((order, index) => (
        <div
          key={index}
          className="flex flex-col border shadow hover:shadow-lg mb-6"
        >
          <span className="flex pt-2 pl-2 space-x-12 text-xs">
            <div className="flex space-x-0.5">
              Order ID:{" "}
              {order.map((item) => (
                <p>{item?.orderId}</p>
              ))}
            </div>
            <div className="flex space-x-0.5">
              Order Date:{" "}
              {order.map((item) => (
                <p>{item?.orderDate}</p>
              ))}
            </div>
          </span>

          <div className="flex text-sm">
            <table className="mt-4">
              <thead>
                <tr>
                  <th className="px-4">Product</th>
                  <th className="px-4">Price</th>
                  <th className="px-4">Quantity</th>
                  <th className="px-4">Total</th>
                  <th className="px-4">Seller</th>
                </tr>
              </thead>
              <tbody>
                {order.map((item, index) => (
                  <tr key={index}>
                    {console.log(item)}
                    <td className="px-2 py-2 text-center text-blue-500 hover:text-purple-500">
                      <Link
                        href={`/products/${item?.cartItem?.productId}`}
                        as={`/products/${item?.cartItem?.productId}`}
                        to={`/products/${item?.cartItem?.productId}`}
                      >
                        <a>{item?.cartItem?.productName}</a>
                      </Link>
                    </td>
                    <td className="px-2 py-2 text-center">
                      {item?.cartItem?.productPrice &&
                        formatCurrency(item?.cartItem?.productPrice)}
                    </td>
                    <td className="px-2 py-2 text-center">
                      {item?.cartItem?.quantity}
                    </td>
                    <td className="px-2 py-2 text-center">
                      {item?.cartItem?.total &&
                        formatCurrency(item?.cartItem?.total)}
                    </td>
                    <td className="px-2 py-2 text-center text-blue-500 hover:text-purple-500">
                      <Link
                        href={`/users/${item?.sellerName}`}
                        as={`/users/${item?.sellerName}`}
                        to={`/users/${item?.sellerName}`}
                      >
                        <a>{item?.sellerName}</a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex space-x-0.5 mb-2 ml-2 text-sm">
            Total:{" "}
            {order.map((item) => (
              <p>{item?.total && formatCurrency(item?.total)}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemsPurchased;

{
  /* <tfoot>
          <tr>
            <th className="px-2 py-2 text-left">Total</th>
            <th></th>
            <th></th>
            <th className="px-4 py-2 text-right">
              {order?.total && formatCurrency(order?.total)}
            </th>
          </tr>
        </tfoot> */
}
