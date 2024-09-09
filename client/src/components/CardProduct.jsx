import { useNavigate } from "react-router-dom";
import { changeStatus, editProduct } from "../Api/ManageProducts";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../Api/CartUser";
import { changeCounter } from "../reducers/auth";
import toast, { Toaster } from "react-hot-toast";

export function CardProduct({ name, price, index, edit, image, data }) {
  const state = useSelector((state) => state.auth);
  const notifyCartOk = () => toast.success("Se ha agregado al carrito");
  const notifyCartBad = () =>
    toast.error("El producto ya se encuentra en el carrito");

  // Destructuring user object from the state
  const { user, isAuthenticate, cartCounter } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      {/* Card */}
      <Toaster />
      <div
        className={
          edit ? "w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2" : "w-full p-2"
        }
      >
        <div className="cursor-pointer rounded-lg bg-white p-4 shadow duration-150 hover:scale-105 hover:shadow-md">
          <img
            className="w-full h-48 rounded-lg object-cover object-center"
            src={image}
            alt="product"
          />
          <p className="my-2 pl-2 font-bold text-gray-500">{name}</p>
          <p className="mb-2 ml-2 text-xl font-semibold text-gray-800">
            $ {price.toLocaleString()}
          </p>
          {/* <p className="mb-2 ml-2 text-xl font-semibold text-gray-800">
            {index}
          </p> */}
          {edit ? (
            <>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-md px-9 py-1 mb-2"
                onClick={() => {
                  navigate(`/manageproducts/${index}`);
                  localStorage.setItem("page", "formulario");
                  const data = { productStatus: true, id: index };

                  editProduct(data)
                    .then((response) => {
                      console.log(response);
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                Editar
              </button>
              {data === true ? (
                <>
                  {" "}
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-bold rounded-md px-7 py-1 mb-2"
                    onClick={() => {
                      const data = {
                        id: index,
                      };
                      changeStatus(data)
                        .then((response) => {
                          window.location.reload();

                          console.log(response);
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    Inactivar
                  </button>
                </>
              ) : (
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-md px-8 py-1 mb-2"
                  onClick={() => {
                    const data = {
                      id: index,
                    };
                    changeStatus(data)
                      .then((response) => {
                        console.log(response);
                        window.location.reload();
                      })
                      .catch((error) => {
                        console.log(error);
                      });
                  }}
                >
                  Activar
                </button>
              )}
            </>
          ) : (
            <>
              <div class="flex items-center mt-6">
                <button
                  onClick={() => {
                    navigate(`/productos/${index}`);
                  }}
                  class=" bg-gray-900 dark:bg-gray-600 text-white py-2 px-6 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
                >
                  Comprar
                </button>
                <button
                  class="mx-2 text-gray-600 border rounded-md p-2 hover:bg-gray-200 focus:outline-none"
                  onClick={() => {
                    if (isAuthenticate && user) {
                      data = {
                        idUser: user.id,
                        idProduct: index,
                        quantity: 1,
                      };
                      addToCart(data)
                        .then(() => {
                          dispatch(changeCounter());

                          notifyCartOk();
                        })
                        .catch(() => {
                          notifyCartBad();
                        });
                    } else {
                      navigate("/login");
                    }
                  }}
                >
                  <svg
                    class="h-5 w-5"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
