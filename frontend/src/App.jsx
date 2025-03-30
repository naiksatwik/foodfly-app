import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Register";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import IsAuthenticated from "./components/IsAuthenticated";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import AdminDashBoard from "./pages/AdminDashBoard";
import { ProductContext } from "./context/ProductContext";
import DelItem from "./pages/DelItem";

const App = () => {

  return (
    <>
    <ProductContext>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" Component={IsAuthenticated} />
            <Route path="/landing" Component={Landing} />
            <Route path="/register" Component={Register} />
            <Route path="/login" Component={Login} />
            <Route path="/sigin" Component={SignIn} />
            <Route path="/home" Component={Home} />
            <Route path="/products" Component={Products} />
            <Route path="/cart" Component={Cart} />
            <Route path="/profile" Component={Profile} />
            <Route path="/addProduct" Component={AddProduct} />
            <Route path="/order" Component={Order} />
            <Route path="/foodfly/user-type/admin" Component={AdminDashBoard} />
            <Route path="/foodfly/DelItem" Component={DelItem} />
            <Route
              path="*"
              element={
                <div>
                  <h2>404 Page not found</h2>
                </div>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
      </ProductContext>
    </>
  );
};

export default App;
