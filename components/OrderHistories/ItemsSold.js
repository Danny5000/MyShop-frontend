import Link from "next/link";

function formatCurrency(value) {
  return "$" + value.toFixed(2);
}

function ItemsSold({ soldProducts }) {
  return (
    <div className="flex flex-col pl-2 place-items-center">
      {soldProducts?.map((product, index) => (
        <div
          key={index}
          className="flex flex-col border shadow hover:shadow-lg mb-4"
        >
          <span className="flex pt-2 pl-2 pr-2 space-x-12 text-xs">
            <div className="flex space-x-0.5 pb-2">
              Order ID:&nbsp;{product.orderId}
            </div>
            <div className="flex space-x-0.5">
              Order Date:&nbsp;{product.orderDate}
            </div>
          </span>

          <hr className="" />

          <div className="flex flex-col text-sm">
            <table className="mt-4">
              <thead>
                <tr>
                  <th className="">Product</th>
                  <th className="">Price</th>
                  <th className="">Quantity</th>
                  <th className="">Total</th>
                  <th className="">Buyer</th>
                </tr>
              </thead>
              <tbody>
                {product.item && (
                  <tr>
                    <td className="py-1 text-center text-blue-500 hover:text-purple-500">
                      <Link
                        href={`/products/${product.item.productId}`}
                        as={`/products/${product.item.productId}`}
                        to={`/products/${product.item.productId}`}
                      >
                        <a>{product.item.productName}</a>
                      </Link>
                    </td>
                    <td className="py-1 text-center">
                      {product.item.productPrice &&
                        formatCurrency(product.item.productPrice)}
                    </td>
                    <td className="py-1 text-center">
                      {product.item.quantity}
                    </td>
                    <td className="py-1 text-center">
                      {product.item.total && formatCurrency(product.item.total)}
                    </td>
                    <td className="py-1 text-center text-blue-500 hover:text-purple-500">
                      <Link
                        href={`/users/${product.purchasedByName}`}
                        as={`/users/${product.purchasedByName}`}
                        to={`/users/${product.purchasedByName}`}
                      >
                        <a>{product.purchasedByName}</a>
                      </Link>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="flex space-x-0.5 mb-2 ml-2 mt-2 text-sm">
              Buyer's Email:&nbsp;<p>{product.purchasedByEmail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemsSold;
