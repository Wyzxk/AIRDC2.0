import { useNavigate } from "react-router-dom";
import { changeStatus, editProduct } from "../Api/ManageProducts";

export function CardProduct({ name, price, index, edit, image, data }) {
  const navigate = useNavigate();
  return (
    <>
      {/* Card */}
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2">
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
            <button
              onClick={() => {
                navigate(`/productos/${index}`);
              }}
              class=" bg-gray-900 dark:bg-gray-600 text-white py-2 px-6 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700"
            >
              Comprar
            </button>
          )}
        </div>
      </div>
    </>
  );
}
