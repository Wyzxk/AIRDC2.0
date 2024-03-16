import { Link } from "react-router-dom";
import { Dropdown, Navbar as Nav } from "flowbite-react";
import { logout } from "../reducers/auth";
import { useSelector, useDispatch } from "react-redux";

function Navbar() {
  // Accessing the state from the Redux store
  const state = useSelector((state) => state.auth);

  // Destructuring user object from the state
  const { user } = state;

  // Dispatching actions to the Redux store
  const dispatch = useDispatch();

  // Function to handle logout
  const handleClick = () => {
    dispatch(logout());
  };
  return (
    <Nav fluid rounded className="m-3">
      {/* Brand/logo */}
      <Nav.Brand href="/">
        <img
          src="/Nav/faviconblack.png"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          <h1>AIRDC</h1>
        </span>
      </Nav.Brand>
      <div className="flex md:order-1">
        {/* Dropdown menu */}
        <Dropdown
          className="text-center w-96 h-60"
          arrowIcon={false}
          inline
          label={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
              />
            </svg>
          }
        >
          {/* Dropdown menu content */}
          <Dropdown.Header>
            <span className="block text-sm m-5">
              <span className="inline-block bg-gray-200 rounded-full p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                  />
                </svg>
              </span>
            </span>
            {user ? (
              <>
                <span className="text-sm font-semibold">
                  <p className="px-20">
                    Usuario:{" "}
                    {user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                  </p>
                </span>
                <br />
                <span className="text-sm font-semibold">
                  <p>
                    Correo:{" "}
                    {user.email.charAt(0).toUpperCase() + user.email.slice(1)}
                  </p>
                </span>
                <br />
                <Link to="/profile">
                  <button
                    type="submit"
                    className="text-sm  mr-4 bg-black text-white px-4 py-2 rounded-lg w-36 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    Mi perfil
                  </button>
                </Link>
                <button
                  onClick={handleClick}
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-lg w-36 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <span>
                Registrate para obtener una mejor experiencia en tus compras
              </span>
            )}
          </Dropdown.Header>
          {!user && (
            <>
              <Link to="/login">
                <button
                  type="submit"
                  className="mr-4 mt-4 bg-black text-white px-4 py-2 rounded-lg w-36 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Iniciar Sesión
                </button>
              </Link>
              <Link to="/signup">
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-2 rounded-lg w-36 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Registrarse
                </button>
              </Link>
            </>
          )}
        </Dropdown>
        {/* Navbar toggle button */}
        <Nav.Toggle />
      </div>
      <Nav.Collapse>
        {/* Navigation links */}
        <Link to="/"> Inicio </Link>
        <Link to="/nosotros">Nosotros</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/contactanos">Contáctanos</Link>
      </Nav.Collapse>
    </Nav>
  );
}
export default Navbar;
