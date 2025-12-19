import { useParams, useNavigate, Link } from "react-router-dom";

function Bill() {
  const { id } = useParams(); // id may or may not exist
  const navigate = useNavigate();

  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  /* --------------------------------------------------
     MODE 1: ALL BILLS LIST  (/bill)
  -------------------------------------------------- */
  if (!id) {
    if (orders.length === 0) {
      return (
        <div className="p-6 text-center">
          <h2 className="text-xl font-bold">No Bills Found</h2>
        </div>
      );
    }

    return (
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">All Bills</h1>

        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded p-4 mb-4 shadow bg-white flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">Bill ID: {order.id}</p>
              <p className="text-sm text-gray-500">{order.date}</p>
              <p className="font-bold text-red-600">
                ₹{Number(order.total).toLocaleString("en-IN")}
              </p>
            </div>

            <Link
              to={`/bill/${order.id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              View Bill
            </Link>
          </div>
        ))}
      </div>
    );
  }

  /* --------------------------------------------------
     MODE 2: SINGLE BILL DETAIL  (/bill/:id)
  -------------------------------------------------- */

  const order = orders.find((o) => String(o.id) === String(id));

  if (!order || !Array.isArray(order.items)) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-red-600">Bill not found</h2>

        <button
          onClick={() => navigate("/bill")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Bills
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded shadow bg-white">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Bill</h1>
        <span className="text-sm text-gray-500">{order.date}</span>
      </div>

      {/* CUSTOMER DETAILS */}
      <div className="mb-4 text-sm">
        <p><b>Name:</b> {order.customer?.name || "-"}</p>
        <p><b>Email:</b> {order.customer?.email || "-"}</p>
        <p><b>Phone:</b> {order.customer?.phone || "-"}</p>
        <p><b>Address:</b> {order.customer?.address || "-"}</p>
      </div>

      <hr className="my-4" />

      {/* ITEMS */}
      <div className="space-y-2 text-sm">
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <span>
              {item.name} × {item.qty}
            </span>
            <span>
              ₹{(Number(item.price) * Number(item.qty)).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>

      <hr className="my-4" />

      {/* TOTAL */}
      <div className="text-right text-xl font-bold">
        Total: ₹{Number(order.total).toLocaleString("en-IN")}
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={() => window.print()}
          className="border px-4 py-2 rounded"
        >
          Print
        </button>

        <button
          onClick={() => navigate("/bill")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Bills
        </button>
      </div>
    </div>
  );
}

export default Bill;
