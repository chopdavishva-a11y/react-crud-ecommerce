import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function Checkout() {
  const navigate = useNavigate()

  const [cart, setCart] = useState([])
  const [isBuyNow, setIsBuyNow] = useState(false)
  const [payment, setPayment] = useState("UPI")

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })

  // 🔥 LOAD DATA (Buy Now OR Full Cart)
  useEffect(() => {
    const buyNow = JSON.parse(localStorage.getItem("buyNowItem"))

    if (buyNow && buyNow.length > 0) {
      setCart(buyNow)
      setIsBuyNow(true)
    } else {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || []
      if (storedCart.length === 0) {
        navigate("/cart")
      }
      setCart(storedCart)
      setIsBuyNow(false)
    }
  }, [navigate])

  // 🔹 FORM CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // 🔹 TOTAL
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  // 🔥 REMOVE ONLY BOUGHT ITEM FROM CART
  const removeBoughtItemFromCart = () => {
    const fullCart = JSON.parse(localStorage.getItem("cart")) || []

    const updatedCart = fullCart.filter(
      cartItem => !cart.some(bought => bought.id === cartItem.id)
    )

    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }

  // 🔥 PLACE ORDER
  const placeOrder = () => {
    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("Please fill all details")
      return
    }

    const order = {
      id: Date.now(),
      customer: form,
      items: cart,
      total,
      paymentMethod: payment,
      date: new Date().toLocaleString()
    }

    const orders = JSON.parse(localStorage.getItem("orders")) || []
    orders.push(order)
    localStorage.setItem("orders", JSON.stringify(orders))

    // ✅ FINAL CART CLEAR LOGIC
    if (isBuyNow) {
      removeBoughtItemFromCart()        // only that item
      localStorage.removeItem("buyNowItem")
    } else {
      localStorage.removeItem("cart")  // full cart
    }

    alert("Order placed successfully 🎉")
    navigate("/orders")
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* CUSTOMER DETAILS */}
      <div className="grid gap-4 mb-6">
        <input name="name" placeholder="Full Name" className="border p-2" onChange={handleChange} />
        <input name="email" placeholder="Email" className="border p-2" onChange={handleChange} />
        <input name="phone" placeholder="Phone" className="border p-2" onChange={handleChange} />
        <textarea name="address" placeholder="Address" rows="3" className="border p-2" onChange={handleChange} />
      </div>

      {/* ORDER SUMMARY */}
      <h2 className="font-bold mb-2">Order Summary</h2>

      {cart.map(item => (
        <div key={item.id} className="flex justify-between border-b py-2">
          <span>{item.name} × {item.qty}</span>
          <span>₹{(item.price * item.qty).toLocaleString("en-IN")}</span>
        </div>
      ))}

      <div className="text-xl font-bold mt-4">
        Total: ₹{total.toLocaleString("en-IN")}
      </div>

      {/* PAYMENT */}
      <h2 className="font-bold mt-6">Payment Method</h2>
      <label className="flex gap-2">
        <input type="radio" checked={payment === "UPI"} onChange={() => setPayment("UPI")} />
        UPI
      </label>
      <label className="flex gap-2">
        <input type="radio" checked={payment === "Card"} onChange={() => setPayment("Card")} />
        Credit / Debit Card
      </label>

      <button
        onClick={placeOrder}
        className="mt-6 w-full bg-green-600 text-white py-3 rounded"
      >
        Place Order
      </button>
    </div>
  )
}

export default Checkout
