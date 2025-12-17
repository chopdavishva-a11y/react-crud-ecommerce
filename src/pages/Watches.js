import { useNavigate } from 'react-router-dom'

function Watches() {
  const navigate = useNavigate()

  const watches = [
  { id: 1, name: "Rolex Submariner", price: 25000, image: "/assets/watch1.jpg", desc: "Luxury waterproof watch" },
  { id: 2, name: "Omega Speedmaster", price: 18500, image: "/assets/watch2.jpg", desc: "Classic chronograph watch" },
  { id: 3, name: "Casio G-Shock", price: 6999, image: "/assets/watch3.jpg", desc: "Rugged sports watch" },
  { id: 4, name: "Fossil Grant Chrono", price: 9500, image: "/assets/watch4.jpg", desc: "Stylish leather watch" },
  { id: 5, name: "Titan Edge", price: 12000, image: "/assets/watch5.jpg", desc: "Ultra slim premium watch" },
  { id: 6, name: "Seiko Prospex", price: 14800, image: "/assets/watch6.jpg", desc: "Professional diver watch" },
  { id: 7, name: "Citizen Eco-Drive", price: 11200, image: "/assets/watch7.jpg", desc: "Solar powered watch" },
  { id: 8, name: "Timex Expedition", price: 5499, image: "/assets/watch8.jpg", desc: "Outdoor adventure watch" },
  { id: 9, name: "Diesel Mega Chief", price: 13900, image: "/assets/watch9.jpg", desc: "Bold oversized dial watch" },
  { id: 10, name: "Fastrack Reflex", price: 3999, image: "/assets/watch10.jpg", desc: "Trendy youth watch" },
  { id: 11, name: "Apple Watch Series 8", price: 41900, image: "/assets/watch11.jpg", desc: "Advanced smartwatch" },
  { id: 12, name: "Samsung Galaxy Watch", price: 27999, image: "/assets/watch12.jpg", desc: "Smart fitness watch" },
  { id: 13, name: "Noise ColorFit Pro", price: 3499, image: "/assets/watch13.jpg", desc: "Budget smartwatch" },
  { id: 14, name: "Fire-Boltt Ninja", price: 2999, image: "/assets/watch14.jpg", desc: "Affordable smart watch" },
  { id: 15, name: "Boat Xtend", price: 4299, image: "/assets/watch15.jpg", desc: "Alexa enabled watch" },
  { id: 16, name: "Fossil Townsman", price: 10500, image: "/assets/watch16.jpg", desc: "Classic automatic watch" },
  { id: 17, name: "Hublot Classic Fusion", price: 85000, image: "/assets/watch17.jpg", desc: "Luxury designer watch" },
  { id: 18, name: "Tag Heuer Carrera", price: 72000, image: "/assets/watch18.jpg", desc: "Racing inspired watch" },
  { id: 19, name: "Emporio Armani AR2434", price: 15999, image: "/assets/watch19.jpg", desc: "Elegant formal watch" },
  { id: 20, name: "Michael Kors Runway", price: 14499, image: "/assets/watch20.jpg", desc: "Fashion stainless watch" },
  { id: 21, name: "Skagen Signatur", price: 9999, image: "/assets/watch21.jpg", desc: "Minimalist Danish design" },
  { id: 22, name: "Daniel Wellington Classic", price: 11999, image: "/assets/watch22.jpg", desc: "Elegant slim watch" },
  { id: 23, name: "Police PL.15534", price: 8499, image: "/assets/watch23.jpg", desc: "Bold fashion watch" },
  { id: 24, name: "Invicta Pro Diver", price: 16500, image: "/assets/watch24.jpg", desc: "Diver style watch" },
  { id: 25, name: "Orient Bambino", price: 13200, image: "/assets/watch25.jpg", desc: "Automatic dress watch" },
  { id: 26, name: "Tissot PRX", price: 29999, image: "/assets/watch26.jpg", desc: "Swiss made premium watch" },
  { id: 27, name: "Rado Centrix", price: 65000, image: "/assets/watch27.jpg", desc: "Ceramic luxury watch" },
  { id: 28, name: "Longines HydroConquest", price: 78500, image: "/assets/watch28.jpg", desc: "Swiss diver watch" },
  { id: 29, name: "Movado Museum Classic", price: 34999, image: "/assets/watch29.jpg", desc: "Iconic single dot design" },
  { id: 30, name: "Bulova Lunar Pilot", price: 22500, image: "/assets/watch30.jpg", desc: "Moon mission inspired watch" }
]

   const addToCart = (watch) => {
  const cart = JSON.parse(localStorage.getItem('cart')) || []

  cart.push({
    ...watch,
    price: Number(watch.price)
  })

  localStorage.setItem('cart', JSON.stringify(cart))

  navigate('/cart')
}
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Watches</h1>

      <div className="grid grid-cols-4 gap-6">
        {watches.map((watch) => (
          <div key={watch.id} className="border rounded shadow p-3">
            <img
              src={watch.image}
              alt={watch.name}
              className="w-full h-48 object-contain bg-white mb-3"
            />

            <h2 className="font-semibold">{watch.name}</h2>
            <p className="text-sm text-gray-500">{watch.desc}</p>

            <p className="text-red-600 font-bold mt-2">
              ₹{watch.price}
            </p>

           <button
  onClick={() => addToCart(watch)}
  className="mt-3 w-full bg-blue-600 text-white py-2 rounded"
>
  Add to Cart
</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Watches

