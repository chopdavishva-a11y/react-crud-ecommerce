import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Cart() {
  const [cart, setCart] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || []
    const withQty = storedCart.map(item => ({
      ...item,
      qty: item.qty || 1
    }))
    setCart(withQty)
    localStorage.setItem("cart", JSON.stringify(withQty))
  }, [])

  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id)
    setCart(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  const increaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    )
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
  }

  const decreaseQty = (id) => {
    const updated = cart.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    )
    setCart(updated)
    localStorage.setItem("cart", JSON.stringify(updated))
  }

  const buyNow = (item) => {
    localStorage.setItem("buyNowItem", JSON.stringify([{ ...item }]))
    navigate("/checkout")
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Cart</h1>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map(item => (
        <div key={item.id} className="flex gap-4 border-b py-4">
          <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />

          <div className="flex-1">
            <h2 className="font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-500">
              ₹{item.price.toLocaleString("en-IN")} × {item.qty}
            </p>
            <p className="text-red-600 font-bold">
              ₹{(item.price * item.qty).toLocaleString("en-IN")}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => decreaseQty(item.id)} disabled={item.qty === 1}>−</button>
            <span>{item.qty}</span>
            <button onClick={() => increaseQty(item.id)}>+</button>
          </div>

          <div className="flex gap-2">
            <button onClick={() => buyNow(item)} className="bg-green-600 text-white px-3 py-1 rounded">
              Buy Now
            </button>
            <button onClick={() => removeFromCart(item.id)} className="border border-red-500 text-red-600 px-3 py-1 rounded">
              Remove
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="mt-6 text-xl font-bold text-right">
          Cart Total: ₹{total.toLocaleString("en-IN")}
        </div>
      )}
    </div>
  )
}

export default Cart
