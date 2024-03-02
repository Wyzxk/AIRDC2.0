import react from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Activate from "./authPages/Activate";
import Login from "./authPages/Login";
import ResetPassword from "./authPages/ResetPassword";
import ResetPasswordConfirm from "./authPages/ResetPasswordConfirm";
import Signup from "./authPages/Signup";
import Layout from "./hocs/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/contactanos" Component={Contact} />
          <Route exact path="/activate/:uid/:token" Component={Activate} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/reset-password" Component={ResetPassword} />
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            Component={ResetPasswordConfirm}
          />
          <Route exact path="/signup" Component={Signup} />
          <Route exact path="/productos" Component={Product} />
        </Routes>
      </Layout>
    </Router>
  );
}
export default App;
