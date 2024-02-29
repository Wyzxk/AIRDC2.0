import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLoaded, checkAuthenticated } from "../reducers/auth";

const Layout = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const {} = state;
  useEffect(() => {
    dispatch(userLoaded());
    dispatch(checkAuthenticated());
  }, []);
  return (
    <>
      <div>
        <Navbar />
        {props.children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
