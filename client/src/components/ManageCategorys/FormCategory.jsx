import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  addCategory,
  getIdCategory,
  putCategory,
  getCategory,
} from "../../Api/ManageCategory";
import { useParams } from "react-router-dom";

// Define the FormProduct component
export function FormCategory() {
  // Retrieve user authentication state from Redux store
  const state = useSelector((state) => state.auth);
  const { user } = state;

  // Get URL parameters using React Router
  const params = useParams();

  // Initialize state variables using useState hooks
  const [message, setMessage] = useState("");
  const [dataForm, setDataForm] = useState({});
  const [categoryData, setCategoryData] = useState({});

  // useEffect hook to set the value of the option
  useEffect(() => {
    if (params.id) {
      getIdCategory(params.id).then((response) => {
        setCategoryData(response.data);
      });
    }
  }, []);

  // Event handler to update form data on input change
  const onChange = (e) => {
    const { name, value } = e.target;
    setDataForm({
      ...dataForm,
      [name]: value,
      categoryStatus: true,
    });
  };

  // Event handler to submit the form data
  const onSubmit = (e) => {
    e.preventDefault();
    setMessage("Enviando...");
    if (params.id) {
      const myElement = document.getElementById("formularioP");
      let f = new FormData(myElement);
      f.append("categoryStatus", true);
      f.append("id", params.id);
      putCategory(f)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const myElement = document.getElementById("formularioP");
      let f = new FormData(myElement);
      f.append("categoryStatus", true);
      addCategory(f)
        .then((response) => {})
        .catch((error) => {
          setMessage(error.response.data);
        });
    }
  };
  return (
    <>
      {params.id ? (
        <h1 className="text-4xl pb-10">Editador de categorias</h1>
      ) : (
        <h1 className="text-4xl pb-10">Registro de categorias</h1>
      )}
      {/* Form for adding/editing product */}
      <form id="formularioP" onSubmit={onSubmit} encType="multipart/form-data">
        {/* Container for form fields */}
        <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 gap-4">
          {/* Input field for product name */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Nombre *{/* Error message for invalid name input */}
              {message.productName && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce el nombre correctamente
                </p>
              )}
            </label>
            {/* Input field for product name */}
            <input
              defaultValue={categoryData[0] && categoryData[0].categoryName}
              minLength={3}
              maxLength={50}
              onChange={onChange}
              type="text"
              className="form-input px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              name="categoryName"
              placeholder="Nombre de la categoria"
            />
          </div>
          {/* Input field for product code */}
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-semibold mb-2">
              Descripción *{/* Error message for invalid code input */}
              {message.productCode && (
                <p className="text-red-500 text-xs font-semibold mt-2">
                  Introduce la descripción correctamente
                </p>
              )}
            </label>
            {/* Input field for product code */}
            <input
              defaultValue={
                categoryData[0] && categoryData[0].categoryDescription
              }
              minLength={3}
              maxLength={50}
              onChange={onChange}
              type="text"
              className="form-input px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500"
              placeholder="Descripción de la categoria"
              name="categoryDescription"
            />
          </div>
          {/* Submit button for form */}
          <div className="mt-5">
            <button
              type="submit"
              className="mt-3 bg-black text-white px-20 py-2 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {/* Display appropriate button text based on message state */}
              {message === "Enviando..." ? message : "Enviar"}
            </button>
            {/* Display success/error message based on message state */}
            {message === "Se han enviado los datos correctamente" && (
              <p className="text-green-500 text-xs font-semibold mt-2">
                {message}
              </p>
            )}
            {(message === "No se ha podido enviar, verifica los datos" ||
              message === "No has realizado ningun cambio") && (
              <p className="text-red-500 text-xs font-semibold mt-2">
                {message}
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
}
