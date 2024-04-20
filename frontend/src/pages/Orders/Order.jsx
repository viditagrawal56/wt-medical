import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Messsage from "../../components/Message";
import Loader from "../../components/Loader";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
} from "../../redux/api/orderApiSlice";

const Order = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const [isCashOnDeliveryConfirmed, setIsCashOnDeliveryConfirmed] = useState(
    localStorage.getItem(`cashOnDeliveryConfirmed_${orderId}`) === "true"
  );

  useEffect(() => {
    if (order && order.isPaid && !order.isDelivered) {
      deliverHandler();
    }
  }, [order]);

  useEffect(() => {
    if (order && order.isPaid && !order.isDelivered) {
      orderPaid();
    }
  }, [order]);
  useEffect(() => {
    localStorage.setItem(
      `cashOnDeliveryConfirmed_${orderId}`,
      isCashOnDeliveryConfirmed
    );
  }, [isCashOnDeliveryConfirmed, orderId]);

  const deliverHandler = async () => {
    await deliverOrder(orderId);
    refetch();
  };

  const orderPaid = async() => {
    await payOrder(orderId);
    refetch();
  }

  const confirmOrderHandler = async () => {
    try {
      await payOrder({ orderId });
      refetch();
      toast.success("Order confirmed");
      setIsCashOnDeliveryConfirmed(true);
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  
  

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Messsage variant="danger">{error.data.message}</Messsage>
  ) : (
    <div className="container flex flex-col ml-[10rem] md:flex-row">
      <div className="md:w-2/3 pr-4">
        <div className="border gray-300 mt-5 pb-4 mb-5">
          {order.orderItems.length === 0 ? (
            <Messsage>Order is empty</Messsage>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-[80%]">
                <thead className="border-b-2">
                  <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {order.orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                      </td>

                      <td className="p-2">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </td>

                      <td className="p-2 text-center">{item.qty}</td>
                      <td className="p-2 text-center">{item.price}</td>
                      <td className="p-2 text-center">
                        $ {(item.qty * item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="mt-5 border-gray-300 pb-4 mb-4">
          <h2 className="text-xl font-bold mb-2">Shipping</h2>
          <p className="mb-4 mt-4">
            <strong className="text-cyan-500">Order:</strong> {order._id}
          </p>

          <p className="mb-4">
            <strong className="text-cyan-500">Name:</strong>{" "}
            {order.user.username}
          </p>

          <p className="mb-4">
            <strong className="text-cyan-500">Email:</strong> {order.user.email}
          </p>

          <p className="mb-4">
            <strong className="text-cyan-500">Address:</strong>{" "}
            {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>

          <p className="mb-4">
            <strong className="text-cyan-500">Method:</strong>{" "}
            {order.paymentMethod}
          </p>

          {order.isPaid ? (
            <Messsage variant="success">Paid on {order.paidAt}</Messsage>
          ) : (
            <Messsage variant="danger">Not paid</Messsage>
          )}
        </div>

        <h2 className="text-xl font-bold mb-2 mt-[3rem]">Order Summary</h2>
        <div className="flex justify-between mb-2">
          <span>Items</span>
          <span>$ {order.itemsPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <span>$ {order.shippingPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Tax</span>
          <span>$ {order.taxPrice}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span>$ {order.totalPrice}</span>
        </div>

        {!order.isPaid && !isCashOnDeliveryConfirmed && !userInfo.isAdmin && (
          <div>
            {loadingPay && <Loader />}{" "}
            <button
              type="button"
              className="bg-cyan-500 text-white w-full py-2 mb-4"
              onClick={confirmOrderHandler}
            >
              Confirm Cash on Delivery
            </button>
          </div>
        )}
        {loadingDeliver && <Loader />}
        {!order.isPaid && userInfo.isAdmin && userInfo && (
          <div>
            <button
              type="button"
              className="bg-cyan-500 text-white w-full py-2 mb-5"
              onClick={orderPaid}
            >
              Payed
            </button>
          </div>
        )}

        {/* {loadingDeliver && <Loader />} */}
        {!order.isDelivered && userInfo.isAdmin && userInfo && !order.isPaid && (
          <div>
            <button
              type="button"
              className="bg-cyan-500 text-white w-full py-2"
              onClick={deliverHandler}
            >
              Mark As Delivered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Order;

