import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from "./pages/Homepage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Shop from "./pages/Shop";
import Items from "./pages/Items";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Navbar";
import EditProfileData from "./pages/EditProfileData";
import EditEmail from "./pages/EditEmail";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} exact />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/:id" element={<Items />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/edit-email" element={<EditEmail />} />
        <Route path="/update-profile" element={<EditProfileData />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
