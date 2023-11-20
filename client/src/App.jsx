import react from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Activate from "./pages/Activate";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";
import Singup from "./pages/Singup";
import Layout from "./hocs/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path="/" Component={Home} />
          <Route exact path="/activate/:uid/:token" Component={Activate} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/reset-password" Component={ResetPassword} />
          <Route
            exact
            path="/password/reset/confirm/:uid/:token"
            Component={ResetPasswordConfirm}
          />
          <Route exact path="/singup" Component={Singup} />
        </Routes>
      </Layout>
    </Router>
  );
}
export default App;
