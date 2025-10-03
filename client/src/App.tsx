import Hero from "./components/Hero"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./pages/client/Shop";
import ProductDetails from "./pages/client/ProductDetails";
import Cart from "./pages/client/Cart";
import Checkout from "./pages/client/Checkout";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";
import Contact from "./pages/client/Contact";



export default function App(){
  return(
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Hero />} />
            {/* client routes */}
            <Route element={<ClientLayout />}>
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/contact" element={<Contact  />} />
            </Route>

            {/* admin routes */}
            <Route element={<AdminLayout/>}>
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/products" element={<Products />} />
              <Route path="/admin/orders" element={<Orders />} />
              <Route path="/admin/users" element={<Users />} />
            </Route>
          </Routes>
        </Router>
    </div>
  )
}