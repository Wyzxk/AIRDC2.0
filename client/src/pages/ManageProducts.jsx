import React, { useState, useEffect } from "react";
import { Navbar as Nav } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { AddressPage } from "../components/AddressPage";
import { PasswordPage } from "../components/PasswordPage";
import { ProductsM } from "../components/ManageProducts/ProductsM";
import { FormProduct } from "../components/ManageProducts/FormProduct";
import { FormCategory } from "../components/ManageCategorys/FormCategory";
import { CategorysM } from "../components/ManageCategorys/CategorysM";

import { logout } from "../reducers/auth";

import { Link, redirect, useNavigate } from "react-router-dom";
function ManageProducts() {
  // Using useSelector hook to access the state from the Redux store
  const state = useSelector((state) => state.auth);

  // Using useState hook to manage the current page state
  const [page, setPage] = useState(localStorage.getItem("page") || "productos");

  // Destructuring user object from the state
  const { user, isAuthenticate, isStaff } = state;

  useEffect(() => {
    if (isStaff === false) {
      navigate("/");
    }
    var localPage = localStorage.getItem("page");
    setPage(localPage);
  }, [isStaff, isAuthenticate, user, localStorage.getItem("page")]);

  // Using useNavigate hook to navigate
  const navigate = useNavigate();

  // Using useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Function to handle page change
  const handlePage = (page) => {
    localStorage.setItem("page", `${page}`);
    setPage(localStorage.getItem("page"));
  };

  // Function to handle logout
  const profilePage = () => {
    navigate("/profile");
  };
  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");
  };
  return isStaff ? (
    <>
      <div className="flex ">
        {/* Navbar component */}
        <Nav fluid rounded className="m-3">
          {/* Navbar content */}
          <div className="flex md:order-1">
            <Nav.Toggle />
          </div>
          <Nav.Collapse>
            <div id="body" className="bg-slate-50 h-screen flex">
              {/* Sidebar navigation */}
              <nav className="bg-white w-80 h-screen flex flex-col gap-10 border-r border-slate-100">
                {/* Logo */}
                <div className="logo text-2xl font-bold text-center h-14 flex items-center justify-center">
                  <a href="/">
                    <h1 className="text-2xl">AIRDC</h1>
                  </a>
                </div>
                <div className="logo text-2xl font-bold text-center h-1  items-center justify-center">
                  <h1 className="text-2xl">Administrador de productos</h1>
                </div>
                {/* User information */}
                <div className="user flex items-center justify-center flex-col gap-4 border-b border-emerald-slate-50 ">
                  {/* Username */}
                  <div className="flex flex-col items-center">
                    <span className="font-semibold text-lg text-emerald-700">
                      {user &&
                        user.username.charAt(0).toUpperCase() +
                          user.username.slice(1)}
                    </span>
                    <span className="text-slate-400 text-sm">Developer</span>
                  </div>
                  {/* Email */}
                  <div className="text-sm text-slate-400">
                    <span className="font-semibold text-slate-500">
                      {user &&
                        user.email.charAt(0).toUpperCase() +
                          user.email.slice(1)}
                    </span>{" "}
                  </div>
                </div>
                {/* Navigation links */}
                <ul className="px-6 space-y-2">
                  <li>
                    <a
                      className="text-center block px-4 py-2.5  font-semibold  hover:bg-gray-900 text-white rounded-lg bg-black"
                      href="#"
                      onClick={profilePage}
                    >
                      Mi perfil
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/manageproducts"
                      className="text-center block px-4 py-2.5 font-semibold hover:bg-gray-900 text-white rounded-lg bg-black"
                      onClick={() => {
                        handlePage("productos");
                      }}
                    >
                      Productos
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/manageproducts"
                      className="text-center block px-4 py-2.5 font-semibold hover:bg-gray-900 text-white rounded-lg bg-black"
                      onClick={() => {
                        handlePage("formulario");
                      }}
                    >
                      Agregar producto
                    </a>
                  </li>
                  <li>
                    <Link
                      to="/manageproducts"
                      className="text-center block px-4 py-2.5 font-semibold hover:bg-gray-900 text-white rounded-lg bg-black"
                      onClick={() => {
                        handlePage("category");
                      }}
                    >
                      Categorias
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/manageproducts"
                      className="text-center block px-4 py-2.5 font-semibold hover:bg-gray-900 text-white rounded-lg bg-black"
                      onClick={() => {
                        handlePage("formCategory");
                      }}
                    >
                      Agregar categoria
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-center block px-4 py-2.5  font-semibold  hover:bg-gray-900 text-white rounded-lg bg-black"
                      href="#"
                      onClick={logoutUser}
                    >
                      Cerrar Sesión
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </Nav.Collapse>
        </Nav>

        <div className="p-4 bg-gray-200 w-full ">
          {page === "productos" ? (
            <>
              <ProductsM />
            </>
          ) : page === "formulario" ? (
            <FormProduct />
          ) : page === "formCategory" ? (
            <FormCategory />
          ) : page === "category" ? (
            <CategorysM />
          ) : (
            <>
              <h1>hola errror </h1>
            </>
          )}
        </div>
      </div>
    </>
  ) : (
    <>
      <h1>No puedes acceder a esta página</h1>
    </>
  );
}

export default ManageProducts;
