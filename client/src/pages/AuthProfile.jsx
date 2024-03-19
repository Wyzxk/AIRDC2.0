import React, { useState } from "react";
import { Navbar as Nav } from "flowbite-react";
import { useSelector, useDispatch } from "react-redux";
import { AddressPage } from "../components/AddressPage";
import { PasswordPage } from "../components/PasswordPage";
import { ProfilePage } from "../components/ProfilePage";

import { logout } from "../reducers/auth";

import { Link, useNavigate } from "react-router-dom";
function AuthProfile() {
  // Using useSelector hook to access the state from the Redux store
  const state = useSelector((state) => state.auth);

  // Using useState hook to manage the current page state
  const [page, setPage] = useState("perfil");

  // Destructuring user object from the state
  const { user } = state;
  // Using useNavigate hook to navigate
  const navigate = useNavigate();

  // Using useDispatch hook to dispatch actions to the Redux store
  const dispatch = useDispatch();

  // Function to handle page change
  const handlePage = (page) => {
    setPage(page);
    console.log(page);
  };

  // Function to handle logout
  const handleClick = () => {
    dispatch(logout());
    navigate("/login");
  };
  return user ? (
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
                      onClick={() => {
                        handlePage("perfil");
                      }}
                    >
                      Mi perfil
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-center block px-4 py-2.5  font-semibold  hover:bg-gray-900 text-white rounded-lg bg-black"
                      href="#"
                      onClick={() => {
                        handlePage("direccion");
                      }}
                    >
                      Dirección de envíos
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-center block px-4 py-2.5  font-semibold  hover:bg-gray-900 text-white rounded-lg bg-black"
                      href="#"
                      onClick={() => {
                        handlePage("tarjetas");
                      }}
                    >
                      Mis tarjetas
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-center block px-4 py-2.5  font-semibold  hover:bg-gray-900 text-white rounded-lg bg-black"
                      href="#"
                      onClick={() => {
                        handlePage("contraseña");
                      }}
                    >
                      Cambiar contraseña
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-center block px-4 py-2.5  font-semibold  hover:bg-gray-900 text-white rounded-lg bg-black"
                      href="#"
                      onClick={handleClick}
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
          {page === "perfil" ? (
            <>
              <ProfilePage />
            </>
          ) : page === "direccion" ? (
            <AddressPage />
          ) : page === "tarjetas" ? (
            <>
              <h1>hola tarjetas</h1>
            </>
          ) : page === "contraseña" ? (
            <PasswordPage />
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
      <h1>No hay usuario</h1>
    </>
  );
}

export default AuthProfile;
