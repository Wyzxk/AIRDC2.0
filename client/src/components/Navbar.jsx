import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Navbar as Nav } from "flowbite-react";
import { logout, getCart, changeCounter } from "../reducers/auth";
import { useSelector, useDispatch } from "react-redux";
// import { getCart } from "../Api/CartUser";
import { useEffect, useState } from "react";
import { getAllProducts } from "../Api/Products";
import {
  addQuantityCart,
  getTotalCart,
  RemoveQuantityCart,
} from "../Api/CartUser";
function Navbar() {
  const navigate = useNavigate();
  // Accessing the state from the Redux store
  const state = useSelector((state) => state.auth);

  // Destructuring user object from the state
  const { user, isAuthenticate, cart, cartCounter } = state;
  const [total, setTotal] = useState();
  function carRedirect() {
    if (!user && !isAuthenticate) {
      navigate("/login");
    }
  }
  useEffect(() => {
    if (isAuthenticate === true && user) {
      dispatch(getCart(user.id));
      getTotalCart()
        .then((response) => {
          setTotal(response.data);
        })
        .catch((error) => {
          console.log("holaErrro");
          console.log(error);
        });
    }
    console.log("holaCartcounter");
  }, [isAuthenticate, user, cartCounter]);
  // Dispatching actions to the Redux store
  const dispatch = useDispatch();
  const clik = () => {
    if (user) {
      console.log("hola");
    } else {
      console.log("no");
    }
  };
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
        <div className="mr-2">
          {/* Car dropdown */}
          <Dropdown
            className="text-center w-96"
            arrowIcon={false}
            inline
            label={
              <svg
                onClick={() => {
                  carRedirect();
                }}
                xmlns="http://www.w3.org/2000/svg"
                width="21"
                height="21"
                fill="currentColor"
                class="bi bi-cart-dash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1" />
              </svg>
            }
          >
            {/* Dropdown menu content */}
            <Dropdown.Header>
              <span className="block text-xs">
                <span className="inline-block bg-gray-200 rounded-full p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="21"
                    height="21"
                    fill="currentColor"
                    class="bi bi-cart-dash-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6.5 7h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1" />
                  </svg>
                </span>
              </span>
              {user && cart ? (
                <>
                  <div className="overflow-y-auto max-h-72 p-2">
                    {" "}
                    {/* Contenedor con scroll */}
                    {cart.map((product, index) => (
                      <div className="flex justify-between mt-6">
                        <div className="flex">
                          <img
                            className="h-20 w-20 object-cover rounded"
                            src={product.productImageUrl}
                            alt=""
                          />
                          <div className="mx-3">
                            <h3 className="text-sm text-gray-600">
                              {product.productName}
                            </h3>
                            <div className="flex items-center mt-2">
                              <button
                                className="text-gray-500 focus:outline-none focus:text-gray-600"
                                onClick={() => {
                                  let data = {
                                    cartId: product.id,
                                    quantity: product.quantity + 1,
                                  };
                                  addQuantityCart(data)
                                    .then((response) => {
                                      dispatch(changeCounter());
                                    })
                                    .catch((error) => {
                                      console.log(error);
                                    });
                                }}
                              >
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                              </button>
                              <span className="text-gray-700 mx-2">
                                {product.quantity}
                              </span>
                              <button
                                className="text-gray-500 focus:outline-none focus:text-gray-600"
                                onClick={() => {
                                  let data = {
                                    cartId: product.id,
                                    quantity: product.quantity - 1,
                                  };
                                  RemoveQuantityCart(data)
                                    .then((response) => {
                                      if (
                                        response.data ===
                                        "Se ha eliminado el producto del carro"
                                      ) {
                                        alert(response.data);
                                      }
                                      dispatch(changeCounter());
                                    })
                                    .catch((error) => {
                                      console.log(error);
                                    });
                                }}
                              >
                                <svg
                                  className="h-5 w-5"
                                  fill="none"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                        <span className="text-gray-600">
                          ${product.total.toLocaleString()}
                        </span>
                      </div>
                    ))}
                    {/* Repite este bloque para cada elemento de producto */}
                  </div>
                  {total && (
                    <p className="pt-2">
                      <b>Total: </b>${total.toLocaleString()}
                    </p>
                  )}

                  <button class="w-full mt-4 bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">
                    Comprar ahora
                  </button>
                </>
              ) : (
                <></>
              )}
            </Dropdown.Header>
          </Dropdown>
        </div>
        <div className="ml-2">
          {" "}
          {/* Dropdown menu */}
          <Dropdown
            className="text-center w-96 h-60"
            arrowIcon={false}
            inline
            label={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
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
        </div>
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
