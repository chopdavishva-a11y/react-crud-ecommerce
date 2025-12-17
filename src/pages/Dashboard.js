import { useEffect, useState } from "react"

function Dashboard() {
  const [stats, setStats] = useState({})

  const loadStats = () => {
    const products = 30

    const cart = JSON.parse(localStorage.getItem("cart")) || []
    const cartItems = cart.reduce((s, i) => s + i.qty, 0)

    const orders = JSON.parse(localStorage.getItem("orders")) || []
    const ordersCount = orders.length
    const revenue = orders.reduce((s, o) => s + o.total, 0)
    const lastOrder =
      ordersCount > 0 ? orders[ordersCount - 1].date : "-"

    setStats({
      products,
      cartItems,
      ordersCount,
      revenue,
      lastOrder
    })
  }

  useEffect(() => {
    loadStats()

    // 🔥 Listen for localStorage updates
    window.addEventListener("storage", loadStats)
    return () => window.removeEventListener("storage", loadStats)
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Products" value={stats.products} />
        <Card title="Cart Items" value={stats.cartItems} />
        <Card title="Orders" value={stats.ordersCount} />
        <Card
          title="Revenue"
          value={`₹${stats.revenue?.toLocaleString("en-IN")}`}
        />
        <Card title="Last Order" value={stats.lastOrder} />
        <Card title="Status" value="Live" />
      </div>
    </div>
  )
}

const Card = ({ title, value }) => (
  <div className="bg-white shadow rounded p-5">
    <p className="text-gray-500">{title}</p>
    <p className="text-2xl font-bold">{value || 0}</p>
  </div>
)

export default Dashboard
