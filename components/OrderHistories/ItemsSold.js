import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import formatCurrency from "../../utils/formatCurrency";

//Renders the items sold page for sellers
function ItemsSold({ orders }) {
  return (
    <div className="flex flex-col pl-2 place-items-center">
      {orders?.map((order, index) => (
        <div
          key={index}
          className="flex flex-col border shadow hover:shadow-lg mb-4"
        >
          <span className="flex pt-2 pl-2 pr-2 space-x-12 text-xs">
            <div className="flex space-x-0.5 pb-2">
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
          <hr className="" />

          <div className="flex flex-col text-sm">
            <table className="mt-4">
              <thead>
                <tr>
                  <th className="">Product</th>
                  <th className="">Price</th>
                  <th className="">Quantity</th>
                  <th className="">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.map(
                  (item, index) =>
                    item.productId && (
                      <tr key={index}>
                        <td className="py-1 text-center text-blue-500 hover:text-purple-500">
                          <Link
                            href={`/products/${item.productId}`}
                            as={`/products/${item.productId}`}
                            to={`/products/${item.productId}`}
                          >
                            <a>{item.productName}</a>
                          </Link>
                        </td>
                        <td className="py-1 text-center">
                          {item.productPrice &&
                            formatCurrency(item.productPrice)}
                        </td>
                        <td className="py-1 text-center">{item.quantity}</td>
                        <td className="py-1 text-center">
                          {item.total && formatCurrency(item.total)}
                        </td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
          <span className="flex justify-between mr-4">
            <div className="flex space-x-0.5 mb-2 ml-4 mt-2 text-sm">
              Total:{" "}
              {order.map((item, index) => (
                <p key={index}>
                  {item.orderTotal && formatCurrency(item.orderTotal)}
                </p>
              ))}
            </div>
            <div className="flex space-x-0.5 mb-2 ml-2 mt-2 text-sm">
              Buyer:{" "}
              {order.map((item, index) => (
                <Link
                  key={index}
                  href={`/users/${item.buyerUserName}`}
                  as={`/users/${item.buyerUserName}`}
                  to={`/users/${item.buyerUserName}`}
                >
                  <p className="text-blue-500 hover:text-purple-500 cursor-pointer">
                    {item.buyerUserName}
                  </p>
                </Link>
              ))}
            </div>
          </span>
          <div className="ml-2">
            <div className="p-2 bg-white rounded-2xl">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex px-4 py-2 text-sm font-medium text-left text-gray-900 bg-blue-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                      <span>Buyer's Information</span>
                      <ChevronUpIcon
                        className={`${
                          open ? "transform rotate-180" : ""
                        } w-5 h-5 text-blue-400`}
                      />
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-800">
                      <div className="flex flex-col space-x-0.5">
                        <div className="flex space-x-0.5">
                          Name:
                          {order.map((item, index) => (
                            <p key={index}>{item.custDetails?.name}</p>
                          ))}
                        </div>
                        <div className="flex space-x-0.5">
                          Email:{" "}
                          {order.map((item, index) => (
                            <p key={index}>{item.email}</p>
                          ))}
                        </div>
                        <div className="flex space-x-0.5">
                          Street Address:
                          {order.map((item, index) => (
                            <p key={index}>{item.custDetails?.streetAddress}</p>
                          ))}
                        </div>
                        <div className="flex space-x-0.5">
                          City:
                          {order.map((item, index) => (
                            <p key={index}>{item.custDetails?.city}</p>
                          ))}
                        </div>
                        <div className="flex space-x-0.5">
                          State:
                          {order.map((item, index) => (
                            <p key={index}>{item.custDetails?.state}</p>
                          ))}
                        </div>
                        <div className="flex space-x-0.5">
                          Zip Code:
                          {order.map((item, index) => (
                            <p key={index}>{item.custDetails?.zipCode}</p>
                          ))}
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ItemsSold;
