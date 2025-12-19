import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  // Load all images from src/assets
  const images = require.context("../assets", false, /\.(jpg|jpeg|png)$/);

  // Load orders from localStorage
  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedOrders);
  }, []);

  // Delete order
  const deleteOrder = (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;

    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // No orders UI
  if (orders.length === 0) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">No Orders Found</h2>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {orders.map((order) => (
        <div key={order.id} className="border rounded p-4 mb-4 shadow bg-white">
          {/* ORDER HEADER */}
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Order ID: {order.id}</span>
            <span className="text-sm text-gray-500">{order.date}</span>
          </div>

          {/* FIRST ITEM PREVIEW */}
          {Array.isArray(order.items) && order.items.length > 0 && (
            <div className="flex items-center gap-4 mb-3">
              {images.keys().includes(`./${order.items[0].image}`) && (
                <img
                  src={images(`./${order.items[0].image}`)}
                  alt={order.items[0].name}
                  className="w-16 h-16 object-contain"
                />
              )}

              <div>
                <p className="font-semibold">{order.items[0].name}</p>

                {order.items.length > 1 && (
                  <p className="text-sm text-gray-500">
                    + {order.items.length - 1} more item(s)
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TOTAL + ACTIONS */}
          <div className="flex justify-between items-center">
            <span className="font-bold text-red-600">
              Total: ₹{Number(order.total).toLocaleString("en-IN")}
            </span>

            <div className="flex gap-2">
              <Link
                to={`/bill/${order.id}`}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                View Bill
              </Link>
              <button
                onClick={() => deleteOrder(order.id)}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Orders;
