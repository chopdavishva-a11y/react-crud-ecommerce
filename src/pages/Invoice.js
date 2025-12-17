import { useParams, useNavigate } from "react-router-dom"

function Invoice() {
  const { id } = useParams()
  const navigate = useNavigate()

  // ✅ Get orders safely
  const orders = JSON.parse(localStorage.getItem("orders")) || []

  // ✅ Find order by ID (string safe)
  const order = orders.find(o => String(o.id) === String(id))

  // ❌ If order OR items missing → stop crash
  if (!order || !Array.isArray(order.items)) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-red-600">
          Invoice not found
        </h2>

        <button
          onClick={() => navigate("/orders")}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Orders
        </button>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded shadow bg-white">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Invoice</h1>
        <span className="text-sm text-gray-500">
          {order.date}
        </span>
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
        {order.items.map(item => (
          <div
            key={item.id}
            className="flex justify-between"
          >
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
          onClick={() => navigate("/orders")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    </div>
  )
}

export default Invoice
