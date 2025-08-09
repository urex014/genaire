import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import AdminLayout from "@/layouts/AdminLayout";

import Home from "./pages/public/Home";
import Shop from "./pages/public/Shop";
import ProductDetails from "@/pages/public/ProductDetails";
import Cart from "@/pages/public/Cart";
import Checkout from "@/pages/public/Checkout";
import OrderSuccess from "@/pages/public/OrderSuccess";
import OrderCancel from "@/pages/public/OrderCancel";
import { CartProvider } from "./lib/CartContext";

import Dashboard from "./pages/admin/Dashboard";
import ManageProducts from "./pages/admin/ManageProducts";
import Orders from "./pages/admin/Orders";

import PrivateRoute from "@/components/PrivateRoute"; 
import Info from "./pages/public/Info";
import Gallery from "./pages/public/Gallery";
import Events from "./pages/public/Events";
import NewProducts from "./pages/public/NewProducts";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/info" element={<Info />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/events" element={<Events />} />
            <Route path="/shop/new" element={<NewProducts />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/order-cancel" element={<OrderCancel />} />
          </Route>

          {/* Admin routes (protected) */}
          <Route
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/products" element={<ManageProducts />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
